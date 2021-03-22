import { html } from '../../node_modules/lit-html/lit-html.js'
import { getArticle, deleteArticle, editArticle } from '../api/data.js'

const template = (item, onDel, onLike) => html`
<section class="detailsOtherPet">
    <h3>${item.name}</h3>
    <p>Pet counter: ${item.likes} ${item._ownerId !== sessionStorage.getItem('userId') ?
        html`<a href="javascript:void(0)"><button class="button" id="${item._id}" @click=${onLike}><i
                    class="fas fa-heart"></i> Pet</button></a>`: ''}
    </p>
    <p class="img"><img src="${item.img}"></p>
    <p class="description">${item.description}</p>
    ${sessionStorage.getItem('userId') == item._ownerId ? html`
    <div class="pet-info">
        <a href="/edit/${item._id}"><button class="button">Edit</button></a>
        <a href="javascript:void(0)" @click=${onDel}><button class="button">Delete</button></a>
    </div>`: ''}
    <i class="fas fa-heart"></i> <span>${item.likes}</span>
</section>`


export async function details(ctx) {
    const id = ctx.params.id
    const article = await getArticle(id)
    ctx.render(template(article, onDel, onLike))
    async function onDel(e) {
        if (confirm('Are you sure')) {
            await deleteArticle(id)
            ctx.page.redirect('/pets')
        }
    }
    async function onLike() {
        const article = await getArticle(id)
        article.likes++
        await editArticle(id, article)
        ctx.render(template(
            await getArticle(id),
            onDel,
            onLike
        ))
    }
}