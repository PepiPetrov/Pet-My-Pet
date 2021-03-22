import { getMyArticles } from '../api/data.js'
import { html } from '../../node_modules/lit-html/lit-html.js'

const template = (data, onLike) => html`
<section class="dashboard">
    <h1>My Pets</h1>
    <ul class="other-pets-list">
        ${data.map(x => card(x, onLike))}
    </ul>
</section>`

const card = (item, onLike) => html`
<li class="otherPet">
    <h3>Name: ${item.name}</h3>
    <p>Category: ${item.category}</p>
    <p class="img"><img src="${item.img}">
    </p>
    <p class="description">${item.description}</p>
    <div class="pet-info">
        ${item._ownerId !== sessionStorage.getItem('userId') ?
        html`<a href="javascript:void(0)"><button class="button" id="${item._id}" @click=${onLike}><i
                    class="fas fa-heart"></i> Pet</button></a>`: ''}
        <a href="/details/${item._id}"><button class="button">Details</button></a>
        <i class="fas fa-heart"></i> <span> ${item.likes}</span>
    </div>
</li>`

export async function my(ctx) {
    ctx.render(template(Object.values(await getMyArticles()), onLike))
    async function onLike(e) {
        const id = e.target.id
        const article = await getArticle(id)
        article.likes++
        await editArticle(id, article)
        ctx.render(template(
            Object.values(
                await getArticles()
            ),
            onLike
        ))
    }
}