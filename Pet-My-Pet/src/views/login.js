import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";


const loginTemplate = (onSubmit, errorMsg) => html`
<section class="login">
    <form action="#" method="post" @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>
            ${        errorMsg ? html`<div id="errorBox">
                <span>${errorMsg}</span>
            </div>` : ''
                }
            <p class="field">
                <label for="username">Username</label>
                <span class="input">
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <span class="actions"></span>
                    <i class="fas fa-user"></i>
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password" />
                    <span class="actions"></span>
                    <i class="fas fa-key"></i>
                </span>
            </p>
            <input class="button" type="submit" class="submit" value="Login" />
        </fieldset>
    </form>
</section>
`

export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('username')
        const password = formData.get('password')
        if (email == '' || password == '') {
            return ctx.render(loginTemplate(onSubmit, 'All fields are required!'))
        }
        await login(email, password)
        ctx.setupNav()
        ctx.page.redirect('/')
    }
}