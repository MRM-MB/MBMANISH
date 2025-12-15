// NEW ITERATION
const Login = () => {
  const pass = '\u006D\u0069\u0063\u0072\u006F\u0062\u0069\u0074';

  const onFinish = values => {
    console.log('Success:', values);
    
    // Set flag in session storage and redirect to another page if password is correct
    if (values.password === pass) {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'web/main.html';
    } else {
      antd.message.error('Contraseña Incorrecta');
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    React.createElement("div", { className: "login-page" },
      React.createElement("div", { className: "login-box" },
        React.createElement("div", { className: "illustration-wrapper" },
          React.createElement("img", { src: "./img.png?q=80&auto=format%2Ccompress&h=700", alt: "Login" })),
        React.createElement(antd.Form, {
            name: "login-form",
            initialValues: { remember: true },
            onFinish: onFinish,
            onFinishFailed: onFinishFailed },
          React.createElement("p", { className: "form-title" }, "Bienvenido/a 👋"),
          React.createElement("p", null, "Accede a la página web"),
          React.createElement(antd.Form.Item, {
              name: "password",
              rules: [{ required: true, message: 'Introduce una contraseña' }] },
            React.createElement(antd.Input.Password, {
                placeholder: "Contraseña" })),
          React.createElement(antd.Form.Item, null,
          React.createElement(antd.Button, { type: "primary", htmlType: "submit", className: "login-form-button" }, "ENTRAR")),
          React.createElement("p", { className: "form-author" }, "© Manish Raj Moriche")))));
};

ReactDOM.render(
  React.createElement(Login, null),
  document.getElementById('root')
);

// Disable back button
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
