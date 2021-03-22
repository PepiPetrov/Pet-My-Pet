import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { logout,getMyArticles} from './api/data.js'
import { homePage } from './views/home.js'
import { registerPage } from './views/register.js'
import { loginPage } from './views/login.js'
import { dashboard } from './views/dashboard.js'
import { details } from './views/details.js'
import { creator } from './views/create.js'
import { editor } from './views/edit.js'
import { my } from './views/my.js'
import { categories } from './views/categories.js'

page('/', decorate, homePage)
page('/register', decorate, registerPage)
page('/login', decorate, loginPage)
page('/pets', decorate, dashboard)
page('/details/:id', decorate, details)
page('/add', decorate, creator)
page('/edit/:id',decorate,editor)
page('/my',decorate,my)
page('/categories/:cat',decorate,categories)
window.f=getMyArticles
setupNav()
page.start()

document.getElementById('logout').addEventListener('click', async () => {
    await logout()
    setupNav()
    page.redirect('/')
})

function decorate(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'))
    ctx.setupNav = setupNav
    next()
}


function setupNav() {
    if (sessionStorage.getItem('userId')) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
        document.querySelector('.second-bar li').textContent = `Welcome, ${sessionStorage.getItem('username')}!`
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}