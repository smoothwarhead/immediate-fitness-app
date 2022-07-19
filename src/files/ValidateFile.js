export default function validations(values){
    let errors = {}


    //first name
    if(!values.firstName.trim()){
        errors.firstName = 'First name required';
    }

    //last name
    if(!values.lastName.trim()){
        errors.lastName = 'Last name required';
    }

    //email
    if (!values.email){
        errors.email = 'Email required';
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = 'Please enter a valid email';
    }

    //password
    if(!values.password){
        errors.password = 'Password is required';
    }
    else if(values.password.length < 6){
        errors.password = 'Password must contain between 6 and 60 characters'
    }

    //city
    if(!values.city){
        errors.city = 'Name of the city is required';
    }

    return errors;



}