/* eslint-disable no-trailing-spaces */

const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text) => {
  if (!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee

// LOOP
// function findEmployeeByName(name, list) {
//   for (let i = 0; i < list.length; i++) {
//     const item = list[i]
//     if (item.name === name) return item
//   }
// }

// RECURSION
// function findEmployeeByName(name, list) {
//   if (list[0].name === name) return list[0]
//   if (list.length === 1) return 'Employee not found!'
//   let altList = list.slice(1)
//   return findEmployeeByName(name, altList)
// }

// FILTER
//[pk] very good -- one improvement to make: use .find instead of .filter and then you don't need the [0]! [ADDRESSED 2020-01-30]
const findEmployeeByName = (name, list) => list.find(entry => entry.name === name)

console.log(findEmployeeByName('moe', employees));
//{ id: 1, name: 'moe' }

spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager

// LOOP
// function findManagerFor(employee, list) {
//   for (let i = 0; i < list.length; i++) {
//     const entry = list[i]
//     if ('managerId' in employee && employee.managerId === entry.id) return entry
//   }
// }

// RECURSION
// function findManagerFor(employee, list) {
//   if (!('managerId' in employee)) return 'Employee has no manager'
//   let entry = list[0]
//   if (employee.managerId === entry.id) return entry
//   let altList = list.slice(1)
//   return findManagerFor(employee, altList)
// }

// FILTER
//[pk] great -- see above [ADDRESSED 2020-01-30]
const findManagerFor = (employee, list) => list.find(entry => employee.managerId === entry.id)

console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));
//{ id: 4, name: 'shep', managerId: 2 }

spacer('')

spacer('findCoworkersFor Larry')
//given an employee and a list of employees, return the employees who report to the same manager

// RECURSION
// function findCoworkersFor(employee, list) {
//   let coworkers = []
//   if (!('managerId' in employee)) return 'This is the big boss'
//   if (list.length === 0) return coworkers
//   let entry = list[0]
//   if (employee.managerId === entry.managerId && employee.id !== entry.id) {
//     coworkers.push(entry)
//   }
//   let altList = list.slice(1)
//   return [...coworkers, ...findCoworkersFor(employee, altList)]
// }

// FILTER
//[pk] c'est parfait!
function findCoworkersFor(employee, list) {
  return list.filter(entry => employee.managerId === entry.managerId && employee.id !== entry.id)
}

console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));
/*[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 

// RECURSION & FILTER
//[pk] great use of recursion! well done.
function findManagementChainForEmployee(employee, list) {
  let chain = []
  if (!('managerId' in employee)) return chain
  //[pk] wow i didn't know you could use "in" like that. you learn something new everyday!
  //[pk] fyi "!employee.managerId" would also work 
  chain = list.find(entry => entry.id === employee.managerId)
  //[pk] "find" more appropriate here, and would save you the "[0]" and the "..." on the next line! [ADDRESSED 2020-01-30]
  return [...findManagementChainForEmployee(chain, list), chain]
}
  
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));
//[  ]

spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));
/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/

spacer('');

spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.

// FILTER, MAP, & RECURSION
//[pk] really great!
function generateManagementTree(list) {
  //[pk] cheating! you should ID the manager by lack of managerId property (sort of like how you do in the previous function!) [ADDRESSED 2020-01-30]

  let tree = list.find(entry => !entry.managerId)

  const internalTree = (employee, orgList) => {
    employee.reports = orgList.filter(entry => employee.id === entry.managerId)
    employee.reports.forEach(entry => internalTree(entry, orgList))
  }

  internalTree(tree, list)
  return tree
}

console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/

spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy

// MAP & RECURSION
//[pk] great! you could save having to decrement count if you moved the increment outside of the forEach -- see solution
function displayManagementTree(orgTree) {
  console.log(orgTree.name)
  
  const innerTree = (arr, count) => {
    const dashes = new Array(count).fill('-').join('')
    arr.forEach(entry => {
      console.log(`${dashes}${entry.name}`)
      count++
      innerTree(entry.reports, count)
      count--
    })
  }
  innerTree(orgTree.reports, 1)
}

displayManagementTree(generateManagementTree(employees));
/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/

