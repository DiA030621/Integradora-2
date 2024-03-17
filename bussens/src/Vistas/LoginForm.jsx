// LoginForm.js
import FormLogin from "../Componentes/componentes-login/FormLogin";
import "../Estilos-vistas/Form.css";

const LoginForm = (props) => {
        const Login = data => 
        {
            const { tipo } = data.usuario[0];
            if(tipo==='Admin')
            {
                props.onLogin();
            }else{
                console.log('no se pudo pa');
            }
        
        };
    

    return (
        <div className="background">
            <div className="container">
                <FormLogin onLogin={Login}/>
            </div>
        </div>
    );
};

export default LoginForm;
