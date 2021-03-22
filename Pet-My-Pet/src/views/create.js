import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAritcle } from "../api/data.js";

const template = (onSubmit, errorMsg) => html`
<section class="create">
    <form action="#" method="post" @submit=${onSubmit}>
        <fieldset>
            <legend>Add new Pet</legend>
            ${errorMsg ? html`<div id="errorBox">
                <span>${errorMsg}</span>
            </div>` : ''}
            <p class="field">
                <label for="name">Name</label>
                <span class="input">
                    <input type="text" name="name" id="name" placeholder="Name" />
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea rows="4" cols="45" type="text" name="description" id="description"
                        placeholder="Description"></textarea>
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageURL" id="image" placeholder="Image" />
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="category">Category</label>
                <span class="input">
                    <select type="text" name="category">
                        <option value="Cats">Cat</option>
                        <option value="Dogs">Dog</option>
                        <option value="Parrots">Parrot</option>
                        <option value="Reptiles">Reptile</option>
                        <option value="Others">Other</option>
                    </select>
                    <span class="actions"></span>
                </span>
            </p>
            <input class="button" type="submit" class="submit" value="Add Pet" />
        </fieldset>
    </form>
</section>`

export async function creator(ctx){
    ctx.render(template(onSubmit))
    async function onSubmit(e){
        e.preventDefault()
        const data=new FormData(e.target)
        const [name,description,img,category]=[...data.entries()].map(c=>c[1])
        if(name==''||description==''||img==''||category==''){
            return ctx.render(template(onSubmit,'All fields are required!'))
        }
        await createAritcle({name,description,img,category,_ownerId:sessionStorage.getItem('userId'),likes:0})
        ctx.page.redirect('/pets')
    }
}