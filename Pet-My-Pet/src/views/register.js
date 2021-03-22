import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js'

const template = (onSubmit, errorMsg) => html`
<section class="register">
    <form action="#" method="post" @submit=${onSubmit}>
        <fieldset>
            ${errorMsg ? html`<div id="errorBox">
                <span>${errorMsg}</span>
            </div>` : ''}
            <legend>Register</legend>
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
            <input class="button" type="submit" class="submit" value="Register" />
        </fieldset>
    </form>
</section>
`

export async function registerPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('username')
        const password = formData.get('password')
        if (email == '' || password == '') {
            return ctx.render(template(onSubmit, 'All fields are required!'))
        }
        await register(email, password)
        ctx.setupNav()
        ctx.page.redirect('/')
    }
}