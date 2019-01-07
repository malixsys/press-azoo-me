/* eslint-env browser */
/* eslint-disable import/prefer-default-export,react/prop-types */
import React, { Component } from 'react';
import { Accordion, Container, Feed, Icon, Label, Menu, Segment } from 'semantic-ui-react';
import dayjs from 'dayjs';
import { TraductionContext } from './Layout';

const fromNow = (d, language = 'fr') => {
  const ret = dayjs(d);
  ret.locale(language);
  let ago = ret.fromNow(true);
  if (language === 'fr') {
    ago = `Il y a ${ago
      .replace(/a year/, 'un an')
      .replace(/years/, 'ans')
      .replace(/a month/, 'un mois')
      .replace(/months/, 'mois')
      .replace(/a day/, 'un jour')
      .replace(/days/, 'jours')
      .replace(/an hour/, 'une heure')
      .replace(/hours/, 'heures')
      .replace(/a few seconds/, 'quelques secondes')}`;
  } else {
    ago += ' ago';
  }
  return ago;
};

const getPosts = async () => {
  const url = 'https://cockpit.malix.com/api/collections/get/azoome_posts';
  const response = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sort: { _created: -1 }
    })
  });

  if (response.status < 200 || response.status > 299) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response.json();
};

function getText(entry, language) {
  let { Post } = entry;
  const postLanguage = entry[`Post_${language}`];
  if (postLanguage && postLanguage.trim && postLanguage.trim() !== '') {
    Post = postLanguage;
  }
  return <span dangerouslySetInnerHTML={{ __html: Post }} />;
}

function getTitle(entry, language) {
  let { Title } = entry;
  const titleLanguage = entry[`Title_${language}`];
  if (titleLanguage && titleLanguage.trim && titleLanguage.trim() !== '') {
    Title = titleLanguage;
  }
  return Title;
}

const Entries = ({ entries, language }) => {
  const panels = entries.map(({ _id, Date, ...rest }) => ({
    key: _id,
    title: {
      content: (
        <Label basic className="noborder">
          <Icon name="calendar" />
          {fromNow(Date, language)}
          <Label.Detail as="h4">{getTitle(rest, language)}</Label.Detail>
        </Label>
      )
    },
    content: {
      content: (
        <Segment basic padded="very">
          {getText(rest, language)}
        </Segment>
      )
    }
  }));
  return <Accordion fluid panels={panels} />;
};

class Posts extends Component {
  state = {
    entries: [],
    loading: true
  };

  async componentDidMount() {
    const { entries } = await getPosts();
    this.setState({ entries, loading: false });
  }

  render() {
    const { loading, entries } = this.state;
    return (
      <TraductionContext.Consumer>
        {traduction => (
          <Container fluid textAlign="left">
            <Segment padded="very" basic fluid loading={loading}>
              <h1>{traduction.POSTS}</h1>
              <Entries entries={entries} language={traduction.language} />
            </Segment>
          </Container>
        )}
      </TraductionContext.Consumer>
    );
  }
}

export default Posts;
