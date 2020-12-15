import React from 'react';

import { Formik } from 'formik';

export function LoginForm(props){
    return (
        <>
             <div>

<h1>Login</h1>

<Formik

  initialValues={{ username: '', password: '' }}

  onSubmit={(values,{setSubmitting})=>{
    setSubmitting(false)
    props.submit(values);
  }}

>

  {({

    values,

    errors,

    touched,
    
    handleChange,

    isSubmitting,
    handleSubmit
    /* and other goodies */

  }) => (

    <form  onSubmit={handleSubmit}>

      <input

        type="text"

        name="username"
                
        onChange={handleChange}

        value={values.username}

      />

      {errors.username && touched.username && errors.username}

      <input

        type="password"

        name="password"
        
        onChange={handleChange}
        value={values.password}

      />

      {errors.password && touched.password && errors.password}

      <button type="submit" disabled={isSubmitting}>

        Submit

      </button>

    </form>

  )}

</Formik>

</div>
        </>
    );   
}