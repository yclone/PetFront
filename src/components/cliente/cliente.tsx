import { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import clienteService from "../../services/cliente.service";

type Props = {};

type FormValues = {
    username: string;
    nome: string;
    sobrenome: string;
    email: string;
    password: string;
};

type State = {
    successful: boolean;
    message: string;
};

export default class Cliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            successful: false,
            message: "",
        };
    }

    validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Username deve ter pelo menos 3 caracteres")
            .max(20, "Username deve ter no máximo 20 caracteres")
            .required("Username é obrigatório"),
        nome: Yup.string()
            .min(3, "Nome deve ter pelo menos 3 caracteres")
            .max(20, "Nome deve ter no máximo 20 caracteres")
            .required("Nome é obrigatório"),
        sobrenome: Yup.string()
            .min(3, "Sobrenome deve ter pelo menos 3 caracteres")
            .max(20, "Sobrenome deve ter no máximo 20 caracteres")
            .required("Sobrenome é obrigatório"),
        email: Yup.string()
            .email("Email inválido")
            .required("Email é obrigatório"),
        password: Yup.string()
            .min(6, "Senha deve ter pelo menos 6 caracteres")
            .max(40, "Senha deve ter no máximo 40 caracteres")
            .required("Senha é obrigatória"),
    });

    handleRegister(formValues: FormValues, actions: FormikHelpers<FormValues>) {
        clienteService.register(
            formValues.username,
            formValues.nome,
            formValues.sobrenome,
            formValues.email,
            formValues.password
        )
            .then(() => {
                 // Clear the form by resetting its values
            actions.resetForm();
                this.setState({
                    message: "Cadastrado com sucesso",
                    successful: true,
                });
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage,
                });
            });
    }

    render() {
        const { successful, message } = this.state;

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Formik
                        initialValues={{
                            username: "",
                            nome: "",
                            sobrenome: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleRegister}
                    >
                        <Form>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage name="username" component="div" className="alert alert-danger" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nome">Nome</label>
                                    <Field name="nome" type="text" className="form-control" />
                                    <ErrorMessage name="nome" component="div" className="alert alert-danger" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sobrenome">Sobrenome</label>
                                    <Field name="sobrenome" type="text" className="form-control" />
                                    <ErrorMessage name="sobrenome" component="div" className="alert alert-danger" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="alert alert-danger" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" className="alert alert-danger" />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>
                                </div>
                            </div>
                            {message && (
                                <div className="form-group">
                                    <div
                                        className={successful ? "alert alert-success" : "alert alert-danger"}
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    }
}
