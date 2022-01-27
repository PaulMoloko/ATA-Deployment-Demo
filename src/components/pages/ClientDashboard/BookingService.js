
import React, { useState, useEffect } from 'react'



const KEYS ={
    employees:'employees',
    employeeId:'employeeId',
    candidates:'candidates'
}

export const Assessment = ()=>([
    { id: 'Development', title: 'Development' },
    { id: 'Recruitment', title: 'Recruitment' },
    
])

export const Province = ()=>([
    { id: 'Gauteng', title: 'Gauteng' },
    { id: 'Kwa-Zulu Natal', title: 'Kwa-zulu Natal' },
    { id: 'Eastern Cape', title: 'Eastern Cape' },
    { id: 'Western Cape', title: 'Western Cape' },
    { id: 'Northen Cape', title: 'Northern Cape' },
    { id: 'Noth West', title: 'North West' },
    { id: 'Free State', title: 'Free State' },
    { id: 'Limpopo', title: 'Limpopo' },
    { id: 'Mpumalanga', title: 'Mpumalanga' },
    
])

export const Status = ()=>([
    { id:  'Pending', title:'Pending'},
    { id: 'Approved', title: 'Approved' },
    { id: 'Declined', title: 'Declined' },
    
    
])

export const getBrand = ()=>([
    { id: 'BMW', title: 'BMW' },
    { id: 'MINI COOPER', title: 'MINI COOPER' },
    { id: 'TOYOTA', title: 'TOYOTA' },
    { id: 'AUDI', title: 'AUDI' },
])

export function insertEmployee(data) {
    let employees=getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function updateEmployee(data) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex(x => x.id == data.id);
    employees[recordIndex] = { ...data }
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}



export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
      localStorage.setItem(KEYS.employees, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.employees));

     //map departmentID to department title
     
   /*  let Brands =getBrand();
     
     return employees.map(y =>({
         ...y,
         Brand: Brands[y.BrandId - 1].title
     })), employees.map(x => ({
        ...x,
        Position: Positions[x.PositionId - 1].title
    }))*/
     
     
}