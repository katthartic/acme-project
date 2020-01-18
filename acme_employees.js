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

  // FILTER
	// (returns an array, not just entry)
	// function findEmployeeByName(name, list) {
	// 	return list.filter(entry => entry.name === name)
	// }

  // RECURSION
  function findEmployeeByName(name, list) {
    if (list[0].name === name) return list[0]
    if (list.length === 1) return 'Employee not found!'
    let altList = list.slice(1)
    return findEmployeeByName(name, altList)
  }

  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  spacer('findManagerFor Shep')
  //given an employee and a list of employees, return the employee who is the manager

  // LOOP
  // function findManagerFor(employee, list) {
	// 	for (let i = 0; i < list.length; i++) {
  //     const entry = list[i]
  //     if ('managerId' in employee && employee.managerId === entry.id) return entry
  //   }
  // }

  // FILTER
	// function findManagerFor(employee, list) {
	// 	return list.filter(entry => employee.managerId === entry.id)
	// }
  
  // RECURSION
  function findManagerFor(employee, list) {
		if (!('managerId' in employee)) return 'Employee has no manager'

		let entry = list[0]
		if (employee.managerId === entry.id) return entry
		
		let altList = list.slice(1)
		return findManagerFor(employee, altList)
	}

  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  spacer('findCoworkersFor Larry')
  //given an employee and a list of employees, return the employees who report to the same manager

  // FILTER
	// function findCoworkersFor(employee, list) {
	// 	return list.filter(entry => employee.managerId === entry.managerId && employee.id !== entry.id)
  // }
  
	// RECURSION
  function findCoworkersFor(employee, list) {
    let coworkers = []
    if (!('managerId' in employee)) return 'This is the big boss'
    if (list.length === 0) return coworkers

    let entry = list[0]
    if (employee.managerId === entry.managerId && employee.id !== entry.id) {
      coworkers.push(entry)
    }

    let altList = list.slice(1)
		return [...coworkers, ...findCoworkersFor(employee, altList)]
	}
  
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));
  /*[ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ] */
  spacer('');
  
  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 

  // RECURSION & FILTER
	function findManagementChainForEmployee(employee, list) {
		let chain = []
    if (!('managerId' in employee)) return chain
    
		chain = list.filter(entry => entry.id === employee.managerId)
		return [...findManagementChainForEmployee(chain[0], list), ...chain]
  }
  
  
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */


  // spacer('');
  
  
  // spacer('generateManagementTree')
  // //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
  // console.log(JSON.stringify(generateManagementTree(employees), null, 2));
  // /*
  // {
  //   "id": 1,
  //   "name": "moe",
  //   "reports": [
  //     {
  //       "id": 2,
  //       "name": "larry",
  //       "managerId": 1,
  //       "reports": [
  //         {
  //           "id": 4,
  //           "name": "shep",
  //           "managerId": 2,
  //           "reports": [
  //             {
  //               "id": 8,
  //               "name": "shep Jr.",
  //               "managerId": 4,
  //               "reports": []
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "id": 3,
  //       "name": "curly",
  //       "managerId": 1,
  //       "reports": [
  //         {
  //           "id": 5,
  //           "name": "groucho",
  //           "managerId": 3,
  //           "reports": [
  //             {
  //               "id": 6,
  //               "name": "harpo",
  //               "managerId": 5,
  //               "reports": []
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "id": 99,
  //       "name": "lucy",
  //       "managerId": 1,
  //       "reports": []
  //     }
  //   ]
  // }
  // */
  // spacer('');
  
  // spacer('displayManagementTree')
  // //given a tree of employees, generate a display which displays the hierarchy
  // displayManagementTree(generateManagementTree(employees));/*
  // moe
  // -larry
  // --shep
  // ---shep Jr.
  // -curly
  // --groucho
  // ---harpo
  // -lucy
  // */

