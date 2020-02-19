const { Component } = React
const { render } = ReactDOM
const { Switch, Link, Route, HashRouter, Redirect } = ReactRouterDOM

const Nav = ({ companies, path }) => {
  const links = [
    {
      to: '/',
      text: 'Acme Company Profits with React Router',
      selected: path === '/'
    },
    {
      to: '/companies',
      text: `Companies (${companies.length})`,
      selected: path.startsWith('/companies')
    }
  ]
  return (
    <nav>
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          className={link.selected ? 'selected' : ''}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  )
}

const Companies = props => {
  const { companies, location, match } = props
  const { letter } = match.params
  const grouped = companies.reduce((acc, company) => {
    const letter = company.name.slice(0, 1)
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(company)
    return acc
  }, {})

  return (
    <div>
      <nav>
        {Object.keys(grouped)
          .sort()
          .map(key => (
            <Link
              to={`/companies/${key}`}
              key={key}
              className={letter === key ? 'selected' : ''}
            >
              {key}
            </Link>
          ))}
      </nav>

      {letter && grouped[letter] && (
        <div id="companiesPage">
          <ul>
            {grouped[letter].map(company => (
              <li key={company.id}>
                <Link
                  to={`/companies/${letter}/${company.id}`}
                  className={
                    location.pathname === `/companies/${letter}/${company.id}`
                      ? 'selected'
                      : ''
                  }
                >
                  {company.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div id="companiesPage">
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            <Link
              to={`/companies/${company.id}`}
              className={
                location.pathname === `/companies/${company.id}`
                  ? 'selected'
                  : ''
              }
            >
              {company.name}
            </Link>
          </li>
        ))}
      </ul>
      <Route path="/companies/:id" component={Company} />
    </div>
  )
}

class Company extends Component {
  constructor() {
    super()
    this.state = {
      companyProfits: []
    }
  }
  async componentDidMount() {
    const id = this.props.match.params.id
    const response = await axios.get(
      `https://acme-users-api-rev.herokuapp.com/api/companies/${id}/companyProfits`
    )
    this.setState({ companyProfits: response.data })
  }
  async componentDidUpdate(prevProps) {
    const id = this.props.match.params.id
    if (id === prevProps.match.params.id) {
      return
    }
    const response = await axios.get(
      `https://acme-users-api-rev.herokuapp.com/api/companies/${id}/companyProfits`
    )
    this.setState({ companyProfits: response.data })
  }
  render() {
    const { companyProfits } = this.state
    return (
      <ul>
        {companyProfits.map(companyProfit => (
          <li className="companyItem" key={companyProfit.id}>
            <div className="year">
              {moment(companyProfit.fiscalYear).format('YYYY')}
            </div>
            ${companyProfit.amount}
          </li>
        ))}
      </ul>
    )
  }
}

const Home = () => {
  return <div id="home">Welcome!!</div>
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      companies: []
    }
  }
  async componentDidMount() {
    const response = await axios.get(
      'https://acme-users-api-rev.herokuapp.com/api/companies'
    )
    this.setState({ companies: response.data })
  }
  render() {
    const { companies } = this.state
    return (
      <HashRouter>
        <Route
          render={({ location }) => (
            <Nav path={location.pathname} companies={companies} />
          )}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/companies/:letter?"
            render={props => <Companies {...props} companies={companies} />}
          />
        </Switch>
      </HashRouter>
    )
  }
}
const root = document.querySelector('#root')
render(<App />, root)
