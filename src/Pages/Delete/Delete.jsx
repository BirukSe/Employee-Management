import React, {useState, useEffect} from 'react'
import './Delete.css';


function Delete() {
    const [error, setError]=useState("");
    const [array, setArray]=useState([]);
    const [result, setResult]=useState("");
    useEffect(()=>{
        async function handle(){
            try{
                const response=await fetch("https://employeebackend-154t.onrender.com/employee");
                const result=await response.json();
                
                if(!response.ok){
                    setError("The response from the backend was not correct! Contact the Developer at bseyoum003@gmail.com");
    
                    console.log("Something is fucking wrong");
                }
                setArray(result);
    
            }
            catch(err){
                setError("Something is wrong from the frontend contac the Developer at bseyoum0003@gmail.com");
    
                console.log(err);
    
            }
        }
        handle();




    }, []);
    async function deleter(id){
        try{
            const response=await fetch(`https://employeebackend-154t.onrender.com/employee/${id}`,{
                method: "DELETE"
            });
            const result =await response.json();
            if(!response.ok){
                setError("Something is wrong in the backend contact he Developer at bseyoum003@gmail.com");
                return;
            }
            setResult(result.message);

        }
        catch(err){
            setError(`Something is wrong in the frontend contact the developer at bseyoum003@gmail.com`);
            console.log(err);
        }

    }
 
  return (
    <div className="deleter">
        {array.map((post)=>(
            <div key={post._id} className="theMapped">
                <h1>{post.name}</h1>
                <h2>{post.position}</h2>
                <p>{post.department}</p>
                <p>{post.email}</p>
                <button onClick={() => deleter(post._id)} className="btn">Delete Employee</button>

                <br></br>
                <h1 className="errorDisplay">{error}</h1>
                <p className="resultDisplay">{result}</p>

            </div>


        ))}
        
      
    </div>
  )
}

export default Delete;
