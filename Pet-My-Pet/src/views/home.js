import { html } from '../../node_modules/lit-html/lit-html.js'

const home = () => html`
<section class="basic">
    <h1> Welcome to pet my pet!</h1>
</section>
`

export function homePage(ctx){
    ctx.render(home())
}