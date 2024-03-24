import React, { Component, useEffect } from "react";
import { Container} from 'reactstrap'
import axios from "axios";
import {useFormik} from 'formik'
import {useParams} from 'react-router-dom'
import '../../Styles/employee/EmployeeForm.css'


import { Form, Button, Col, Row } from "react-bootstrap";


const EmployeeSalaryForm = () => {

  const params = useParams();

  const calculateOTTotal = () => {
    const otHours = parseFloat(formik.values.otHours) || 0;
    const otRate = parseFloat(formik.values.otRate) || 0;
    const basicSal = parseFloat(formik.values.basicSal) || 0;
    const bonus = parseFloat(formik.values.bonus) || 0;
    const otTotal = otHours * otRate;
    formik.setFieldValue('otTotal', otTotal.toFixed(2));
    const totalSal = otTotal + basicSal + bonus;
    formik.setFieldValue('totalSal', totalSal.toFixed(2));
  };

    const validate = values => {
      const errors = {};

      if (!values.month) {
        errors.month = "*Required";
      }
      if (!values.basicSal) {
        errors.basicSal = "*Required";
      }
    //   if (!values.otHours) {
    //     errors.otHours = "*Required";
    //   }
    //   if (!values.otRate) {
    //     errors.otRate = "*Required";
    //   }
      if (!values.bonus) {
        errors.bonus = "*Required";
      }

      return errors;
    }

    const formik = useFormik({
      initialValues: {
        empId: params.id,
        basicSal: "",
        otHours: "",
        otRate: "",
        bonus: "",
        month: "",
        otTotal: "",
        totalSal: ""

      },
      validate,
      onSubmit: async(values) => {
        

        try{
            const response = await fetch(`http://localhost:8080/employeeSalary/addEmployeeSalary`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values),
            });
            if(response.ok){
              hideLoadingSpinner();
              window.alert('Data has been inserted successfully');
              window.location = "http://localhost:3000/employeeDashboard";
              console.log('Successfully added to list');
            }else{
              console.error('Failed to submit form:', response.status, response.statusText);
            }
          }catch(error){
            console.error('Error submitting form:', error);
          }
      }

    });

    return (
      <body id='Body'>
      <section className="employeeForm">
      <div className='form'>
        <h2 className="title code">Employee Salary Assignment</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={formik.handleSubmit}>

            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Employee ID
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name="empId"
                    placeholder="Employee ID"
                    onChange={formik.handleChange}
                    value={formik.values.empId}
                    // onBlur={formik.handleBlur}
                    readOnly
                    // required
                  />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Select Month
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="month"
                  name="month"
                  placeholder="Month"
                  onChange={formik.handleChange}
                  value={formik.values.month}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.month && formik.errors.month ? <div className="error">{formik.errors.month}</div>: null}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Basic Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="basicSal"
                  placeholder="Basic Salary"
                  onChange={formik.handleChange}
                  value={formik.values.basicSal}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.basicSal && formik.errors.basicSal ? <div className="error">{formik.errors.basicSal}</div>: null}
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              OT Hours
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="otHours"
                  placeholder="OT Hours"
                  onChange={formik.handleChange}
                  value={formik.values.otHours}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.otHours && formik.errors.otHours ? <div className="error">{formik.errors.otHours}</div>: null}
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              OT Rate
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="otRate"
                  placeholder="OT Rate"
                  onChange={formik.handleChange}
                  value={formik.values.otRate}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.otRate && formik.errors.otRate ? <div className="error">{formik.errors.otRate}</div>: null}
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              OT Total
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="otTotal"
                  placeholder="OT Total"
                  onChange={formik.handleChange}
                  value={formik.values.otTotal}
                  //onBlur={formik.handleBlur}
                  readOnly
                  //required
                />
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Bonus
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="bonus"
                  placeholder="Bonus"
                  onChange={formik.handleChange}
                  value={formik.values.bonus}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.bonus && formik.errors.bonus ? <div className="error">{formik.errors.bonus}</div>: null}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Total Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  name="totalSal"
                  placeholder="Total Salary"
                  onChange={formik.handleChange}
                  value={formik.values.totalSal}
                //   onBlur={formik.handleBlur}
                  readOnly
                  required
                />
                {formik.touched.totalSal && formik.errors.totalSal ? <div className="error">{formik.errors.totalSal}</div>: null}
              </Col>
            </Form.Group>
        
            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button disabled={formik.isSubmitting} type="submit">{formik.isSubmitting ? 'Submitting' : 'Submit'}</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset">
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
      </section>
      </body>
    );
  }

export default EmployeeSalaryForm;