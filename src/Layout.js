/* eslint-env browser */
import { Container, Icon, Image, Menu } from 'semantic-ui-react';
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import logo from './assets/logo.png';

export const TraductionContext = React.createContext({});

const traductions = {
  fr: {
    language: 'fr',
    next: 'en',
    NEXT_LANGUAGE_LABEL: 'English',
    BACK_TO_AZOOME: 'Aller à aZoo.me',
    POSTS: 'Articles',
    TITLE: 'Presse • aZoo.me'
  },
  en: {
    language: 'en',
    next: 'fr',
    NEXT_LANGUAGE_LABEL: 'Français',
    BACK_TO_AZOOME: 'Go to aZoo.me',
    POSTS: 'Posts',
    TITLE: 'Presse • aZoo.me'
  }
};

const getDefaultLanguage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('language') || 'fr';
  }
  return 'fr';
};

const setLanguage = language => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('language', language);
  }
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: getDefaultLanguage()
    };
    this.toggleLanguage = this.toggleLanguage.bind(this);
  }

  componentDidMount() {
    this.setTitle();
  }

  setTitle() {
    const { language } = this.state;
    const traduction = traductions[language];
    document.title = traduction.TITLE;
  }

  toggleLanguage() {
    this.setState(
      ({ language }) => ({
        language: traductions[language].next
      }),
      () => {
        const { language } = this.state;
        setLanguage(language);
      }
    );
  }

  render() {
    const { children } = this.props;
    const { language } = this.state;

    const traduction = traductions[language];

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item>
              <Image size="small" className="App-Logo" src={logo} alt="aZoo.me" style={{ marginRight: '1.5em' }} />
            </Menu.Item>
            <Menu.Item as="a" href="https://azoo.me">
              {traduction.BACK_TO_AZOOME}
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item onClick={this.toggleLanguage}>
                <Icon name="globe" />
                {traduction.NEXT_LANGUAGE_LABEL}
              </Menu.Item>
            </Menu.Menu>

            {/* <Dropdown item simple text="Dropdown">
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className="dropdown icon" />
              <span className="text">Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
          </Container>
        </Menu>

        <Container fluid style={{ paddingTop: '7em' }}>
          <TraductionContext.Provider value={traduction}>{children}</TraductionContext.Provider>
        </Container>
      </div>
    );
  }
}

Layout.propTypes = { children: PropTypes.any.isRequired };
export default Layout;
