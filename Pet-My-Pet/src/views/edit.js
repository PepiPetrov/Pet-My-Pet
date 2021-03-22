import { html } from '../../node_modules/lit-html/lit-html.js'
import { editArticle, getArticle } from '../api/data.js'

const edit = (item, onSubmit, errorMsg) => html`
<section class="create">
    <form action="#" method="post" @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Pet</legend>
            ${errorMsg ? html`<div id="errorBox">
                <span>${errorMsg}</span>
            </div>` : ''}
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <input type="text" name="name" id="name" placeholder="Name" .value=${item.name}></textarea>
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageURL" id="image" placeholder="Image" .value=${item.img} />
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea rows="4" cols="45" type="text" name="description" id="description"
                        placeholder="Description" .value=${item.description}></textarea>
                    <span class="actions"></span>
                </span>
            </p>
            <input class="button" type="submit" class="submit" value="Save" />
        </fieldset>
    </form>
</section>`

export async function editor(ctx) {
    ctx.render(edit(await getArticle(ctx.params.id), onSubmit))
    async function onSubmit(e){
        e.preventDefault()
        const [name,img,description]=[...new FormData(e.target).entries()].map(x=>x[1])
        if(name==''||img==''||description==''){
            return ctx.render(edit(await getArticle(ctx.params.id),onSubmit,'All fields are required!'))
        }
        await editArticle(ctx.params.id,{name,description,img,_ownerId:sessionStorage.getItem('userId'),likes:await getArticle(ctx.params.id
            ).likes})
        ctx.page.redirect('/details/'+ctx.params.id)
    }
}