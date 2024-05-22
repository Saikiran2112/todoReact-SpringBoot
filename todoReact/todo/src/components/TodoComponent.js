import { useParams,useNavigate} from "react-router-dom";
import { AuthContext } from "../security/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Field, Formik, ErrorMessage } from "formik";

export default function TodoComponent() {
  const { user,tok } = useContext(AuthContext);
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
    if(id!==-1){
      axios
      .get(`http://localhost:8080/users/${user}/todos/${id}`,{
        headers:{
          Authorization:tok
        }
      })
      .then((response) => {
        console.log(response.data.description);
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => {
        console.log(user);
        console.log(error);
      });
    }
    
  }, [id]);
  function handleSubmit(values) {
    if(id!==-1){
      console.log(values);
    const todo={
      id:id,
      username:user,
      description:values.description,
      targetDate:values.targetDate,
      done:false
    }
    axios.put(`http://localhost:8080/users/${user}/todos/${id}`,todo,{
      headers:{
        Authorization:tok
      }
    }).then((response)=>{
      
      navigate(`/todos`)

    }).catch((error)=>{
    console.log(error)
    })
    }
    else{
      const todo={
        
        username:user,
        description:values.description,
        targetDate:values.targetDate,
        done:false
      }
      axios.post(`http://localhost:8080/users/${user}/todos/${id}`,todo,{
        headers:{
          Authorization:tok
        }
      }).then((response)=>{
        
        navigate(`/todos`)
  
      }).catch((error)=>{
      console.log(error)
      })

    }
    
  }
  function validate(values) {
    let errors={
        // description:"Enter a valid description",
        // targetDate:"Enter a valid target Date"
    }

    if(values.description.length<5){
        errors.description="Enter at least 5 characters"
    }
    if(values.targetDate===null){
        errors.targetDate="Enter Target Date"
    }
    return errors;

  }
  return (
    <div className="container">
      <h1>Enter Todo details</h1>
      <div>
        <Formik
          validate={validate}
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            
            <Form>
                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>TargetDate</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
