/* eslint-env mocha */
/* eslint-disable no-unused-vars */

/** IGNORE ALL OF THIS **/
/** IGNORE ALL OF THIS **/
/** IGNORE ALL OF THIS **/
/** IGNORE ALL OF THIS **/
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  includeNodeLocations: true,
  runScripts: 'dangerously'
})
const { window } = dom

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function(id) {
  clearTimeout(id)
}

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  })
}

copyProps(window, global)

import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import spies from 'chai-spies'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  Switch,
  Redirect,
  Route,
  MemoryRouter,
  Link,
  NavLink
} from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())
chai.use(spies)

import React from 'react'
import { expect, assert } from 'chai'
import { mount, shallow } from 'enzyme'

/* START HERE */
/* START HERE */
/* START HERE */
/* START HERE */

/**************************/
/* The Company Component */
/**************************/

const Company = ({ name }) => {
  return <div id="company">{name}</div>
}

describe('The <Company /> Component', () => {
  describe('Rendering', () => {
    describe('when prop name is The Acme Company', () => {
      it('renders the name of the company in an div tag with an id of company', () => {
        const wrapper = shallow(<Company name="The Acme Company" />)
        const companyDiv = wrapper.find('div#company')

        expect(companyDiv).to.have.length(
          1,
          'Expected to find company name div'
        )
        expect(companyDiv.text()).to.equal('The Acme Company')
      })
    })
    describe('when prop name is The FooBarBazz Company', () => {
      it('renders the name of the company in an div tag with an id of title', () => {
        const wrapper = shallow(<Company name="The FooBarBazz Company" />)
        const companyDiv = wrapper.find('div#company')

        expect(companyDiv).to.have.length(
          1,
          'Expected to find company name div'
        )
        expect(companyDiv.text()).to.equal('The FooBarBazz Company')
      })
    })
  })
})

/**************************/
/* The  Notice Component */
/**************************/

const Notice = ({ text, critical }) => {
  return <div className={critical ? 'red' : ''}>{text.toUpperCase()}</div>
}

describe('<Notice />', () => {
  describe('Rendering the text props', () => {
    it('renders text in a div in all caps', () => {
      let wrapper = shallow(<Notice text="Look Out" />)
      let div = wrapper.find('div')

      expect(div).to.have.length(1, 'Expected to find one div element')
      expect(div.text()).to.equal('LOOK OUT')

      wrapper = shallow(<Notice text="Watch It" />)
      div = wrapper.find('div')

      expect(div).to.have.length(1, 'Expected to find one div element')
      expect(div.text()).to.equal('WATCH IT')
    })
  })
  describe('When critical props is set to true', () => {
    it('sets the class name to red', () => {
      let wrapper = shallow(<Notice text="Look Out" critical={true} />)
      let div = wrapper.find('div.red')

      expect(div).to.have.length(1, 'Expected to find one div element')
      expect(div.text()).to.equal('LOOK OUT')

      wrapper = shallow(<Notice text="Watch It" />)
      div = wrapper.find('div.red')

      expect(div).to.have.length(0, 'Expected not to find div with class red')
    })
  })
})

/**************************/
/* The Preview Component */
/**************************/
class Preview extends React.Component {
  constructor(props) {
    super()
    this.state = {
      content: props.content,
      charCount: props.charCount,
      isPreview: props.isPreview
    }
  }
  render() {
    const { content, charCount, isPreview } = this.state
    return (
      <p onclick={this.setState({ isPreview: !isPreview })}>
        {isPreview ? content.slice(0, charCount) : content}
      </p>
    )
  }
}

xdescribe('<Preview />', () => {
  describe('state', () => {
    it('sets state with passed in props and renders component correctly', () => {
      let wrapper = shallow(
        <Preview content="Hello World" charCount={2} isPreview={true} />
      )
      expect(wrapper.state()).to.eql(
        { content: 'Hello World', charCount: 2, isPreview: true },
        'expected state to contain passed in props'
      )
      expect(wrapper.find('p').text()).to.equal('He')

      wrapper = shallow(
        <Preview content="Hello World!!!!" charCount={3} isPreview={false} />
      )
      expect(wrapper.state()).to.eql(
        { content: 'Hello World!!!!', charCount: 3, isPreview: false },
        'expected state to contain passed in props'
      )
    })
  })

  describe('interaction', () => {
    it('clicking the p sets toggles isPreview', () => {
      const wrapper = shallow(
        <Preview content="Hello World" charCount={2} isPreview={true} />
      )

      wrapper.find('p').simulate('click')
      expect(wrapper.state().isPreview).to.equal(false)
      expect(wrapper.find('p').text()).to.equal('Hello World')

      wrapper.find('p').simulate('click')
      expect(wrapper.state().isPreview).to.equal(true)
      expect(wrapper.find('p').text()).to.equal('He')
    })
  })
})

/**************************/
/* The Things Component */
/**************************/

const Things = ({ things }) => {
  return (
    <div>
      <ul>
        {things.map(element => {
          return <li>{element.name}</li>
        })}
      </ul>
    </div>
  )
}

describe('The Things List', () => {
  describe('With three things', () => {
    it('displays the three things names in an unordered list', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR' },
        { id: 3, name: 'BAZZ' }
      ]
      const wrapper = shallow(<Things things={things} />)
      const ul = wrapper.find('ul')
      expect(ul).to.have.length(1, 'Expected to find UL')
      const lis = wrapper.find('li')
      expect(lis).to.have.length(3, "Expected to 3 LI's")

      expect(lis.first().text()).to.equal('FOO')
      expect(lis.last().text()).to.equal('BAZZ')

      expect(lis.first().key()).to.equal('1')
      expect(lis.last().key()).to.equal('3')
    })

    it('special thing gets a special class', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR', special: true },
        { id: 3, name: 'BAZZ' }
      ]
      const wrapper = shallow(<Things things={things} />)
      const special = wrapper.find('li.special')
      expect(special.length).to.equal(1)
      expect(special.text()).to.equal('BAR')
    })
  })
})

/**************************/
/* The StatefulThings Component */
/**************************/

class StatefulThings extends React.Component {
  constructor(props) {
    super()
    this.state = {
      things: props.things
    }
  }
  render() {
    const { things } = this.state
    return (
      <ul>
        {things.forEach(thing => {
          ;<li>{thing.name}</li>
        })}
      </ul>
    )
  }
}

xdescribe('StatefulList', () => {
  describe('With three items', () => {
    it('displays the three things names in an unordered list', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR' },
        { id: 3, name: 'BAZZ' }
      ]
      const wrapper = shallow(<StatefulThings things={things} />)
      const ul = wrapper.find('ul')
      expect(ul).to.have.length(1, 'Expected to find UL')
      const lis = wrapper.find('li')
      expect(lis).to.have.length(3, "Expected to 3 LI's")

      expect(lis.first().text()).to.equal('FOO')
      expect(lis.last().text()).to.equal('BAZZ')

      expect(lis.first().key()).to.equal('1')
      expect(lis.last().key()).to.equal('3')
    })
  })
  describe('Interaction', () => {
    it('clicking on thing toggles its special property', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR' },
        { id: 3, name: 'BAZZ' }
      ]
      const wrapper = shallow(<StatefulThings things={things} />)
      const ul = wrapper.find('ul')
      let lis = wrapper.find('li.special')
      expect(lis.length).to.equal(0)

      wrapper
        .find('li')
        .last()
        .simulate('click')
      expect(wrapper.state().things[2].special).to.equal(true)
      lis = wrapper.find('li.special')
      expect(lis.length).to.equal(1)

      wrapper
        .find('li')
        .last()
        .simulate('click')
      expect(wrapper.state().things[2].special).to.equal(false)
    })
  })
})

/**************************/
/* Ice Cream Form */
/**************************/

class IceCreamForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      scoopOne: props.scoopOne,
      scoopTwo: props.scoopTwo
    }
  }
  render() {
    const { scoopOne, scoopTwo } = this.state
    return (
      <div>
        <input
          name="scoopOne"
          value={scoopOne}
          onChange={ev => this.setState({ scoopOne: ev.target.value })}
        >
          {' '}
        </input>
        <input
          name="scoopTwo"
          value={scoopTwo}
          onChange={ev => this.setState({ scoopTwo: ev.target.value })}
        >
          {' '}
        </input>
      </div>
    )
  }
}

describe('<IceCreamForm />', () => {
  it('has state for scoopOne and scoopTwo', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />
    )
    expect(wrapper.state()).to.eql({
      scoopOne: 'vanilla',
      scoopTwo: 'chocolate'
    })
  })

  it('has 2 input fields', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />
    )
    const scoopOneInput = wrapper.find('input[name="scoopOne"]')
    const scoopTwoInput = wrapper.find('input[name="scoopTwo"]')
    expect(scoopOneInput.length).to.equal(
      1,
      'could not find input for scoopOne'
    )
    expect(scoopTwoInput.length).to.equal(
      1,
      'could not find input for scoopTwo'
    )
  })

  it('input fields have value props from state', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />
    )
    const scoopOneInput = wrapper.find('input[name="scoopOne"]')
    const scoopTwoInput = wrapper.find('input[name="scoopTwo"]')

    expect(scoopOneInput.props().value).to.equal('vanilla')
    expect(scoopTwoInput.props().value).to.equal('chocolate')
  })

  it('changing input changes the state', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />
    )
    const scoopOneInput = wrapper.find('input[name="scoopOne"]')
    const scoopTwoInput = wrapper.find('input[name="scoopTwo"]')

    expect(scoopOneInput.props().value).to.equal('vanilla')
    expect(scoopTwoInput.props().value).to.equal('chocolate')
    scoopOneInput.simulate('change', {
      target: { name: 'scoopOne', value: 'strawberry' }
    })
    expect(wrapper.state().scoopOne).to.equal('strawberry')

    scoopTwoInput.simulate('change', {
      target: { name: 'scoopTwo', value: 'coffee' }
    })
    expect(wrapper.state().scoopTwo).to.equal('coffee')
  })
})

/**************************/
/* Vanilla JS */
/**************************/

const basicIteration = (list, func) => {
  for (let i = 0; i < list.length; i++) {
    console.log(func(list[i], i))
  }
}

const mapIteration = (list, func) => {
  let result = []
  for (let i = 0; i < list.length; i++) {
    result.push(func(list[i], i))
  }
  return result
}

describe('Understanding of Iteration', () => {
  let list
  beforeEach(() => {
    list = new Array(Math.ceil(Math.random() * 10) + 5)
      .fill('')
      .map(e => Math.floor(Math.random() * 1000))
  })

  describe('Basic', () => {
    it('Can iterate over a list and call a callback on each element', () => {
      const mySpy = chai.spy()
      const forEachSpy = chai.spy.on(list, 'forEach')
      basicIteration(list, mySpy)

      // Dont use forEach!
      expect(forEachSpy).not.to.have.been.called()

      for (let i = 0; i < list.length; ++i) {
        expect(mySpy)
          .on.nth(i + 1)
          .to.be.called.with(list[i])
      }
    })
  })

  describe('Functional', () => {
    describe('Map', () => {
      it('Can map over a list creating a new list using a callback', () => {
        const mapSpy = chai.spy.on(list, 'map')
        const multiplier = Math.ceil(Math.random() * 30)
        const newList = mapIteration(list, e => e * multiplier)

        // Dont use map!
        expect(mapSpy).not.to.have.been.called()

        for (let i = 0; i < list.length; ++i) {
          expect(newList[i]).to.eql(list[i] * multiplier)
        }
      })
    })
  })
})

/**************************/
/* Picker */
/**************************/

const picker = (arr, func) => {
  return func(x, index)
}

describe('picker function', () => {
  // two helpers for us later
  const isOdd = x => x % 2
  const isEven = x => x % 2 === 0
  // base data we'll play with
  const numbers = [1, 2, 3, 4, 5, 6]

  it('filters an array using a given function and gives back a random element', () => {
    const oddPicker = picker(numbers, isOdd)
    expect(oddPicker, 'Expected picker to return a function').to.be.a(
      'function'
    )

    const oddNumber = oddPicker()
    expect(
      oddNumber,
      'The returned function (when invoked) should return an element of the array'
    ).to.be.a('number')

    expect(
      [1, 3, 5].includes(oddNumber),
      `Expected oddNumber to be 1, 3, or 5, not ${oddNumber}`
    ).to.equal(true)
  })

  it('works for other functions and is not hardcoded for odd', () => {
    const evenPicker = picker(numbers, isEven)
    expect(evenPicker, 'Expected picker to return a function').to.be.a(
      'function'
    )

    const evenNumber = evenPicker()
    expect(
      evenNumber,
      'The returned function (when invoked) should return an element of the array'
    ).to.be.a('number')

    expect(
      [2, 4, 6].includes(evenNumber),
      `Expected evenNumber to be 2, 4, or 6, not ${evenNumber}`
    ).to.equal(true)
  })
})

const uncertainFunc = (arg1, retVal, timed) => {
  return new Promise(arg1 => {
    setTimer(() => retVal, timed)
  })
}

describe('Promises', () => {
  describe('Uncertain', () => {
    it('Returns a resolved value if given true for whether it should resolve', () => {
      const retVal = 'Winston the Aussie'
      const prom = uncertainFunc(true, retVal)

      expect(prom instanceof Promise).to.eql(true)

      return prom
        .then(v => {
          expect(v).to.eql(retVal)
        })
        .catch(() => {
          // Should not fail!
          assert.fail('This promise should not fail!')
        })
    })

    it('Returns a rejected value if given false for whether it should resolve', () => {
      const retVal = 'Winston the Aussie'
      const prom = uncertainFunc(false, retVal)

      expect(prom instanceof Promise).to.eql(true)

      return prom
        .then(() => {
          // Should not succeed!
          assert.fail('This promise should not fail!')
        })
        .catch(v => {
          expect(v).to.eql(retVal)
        })
    })

    const clock = sinon.useFakeTimers()

    it('Delays resolution if given a delay as a third argument', done => {
      const retVal = 'Winston the Aussie'
      const timedProm = uncertainFunc(true, retVal, 500)
      const lessTimedProm = uncertainFunc(true, retVal, 100)

      expect(timedProm instanceof Promise).to.eql(true)

      let timedPromResolved = false
      let isCorrectOrder = false
      let errorCaught = false

      timedProm
        .then(v => {
          timedPromResolved = true
          expect(v).to.eql(retVal)
          expect(isCorrectOrder).to.eql(true)
        })
        .catch(e => {
          errorCaught = true
          done(e)
        })
        .finally(() => {
          if (isCorrectOrder && !errorCaught) {
            done()
          }
        })

      lessTimedProm
        .then(() => {
          expect(timedPromResolved).to.eql(false)
          isCorrectOrder = true
        })
        .catch(done)

      clock.tick(110)

      clock.tick(400)
    })

    clock.restore()
  })
})
