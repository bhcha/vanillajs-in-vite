import '/css/style.css'
import {get, post, request} from "/statics/networks.js";
import {TemplateLayout} from "@/pages/templateLayout.js";
import {DefaultLayout} from "@/pages/defaultLayout.js";
import {adminMenuLayout} from "@/pages/adminMenuLayout.js";


export const renderContent = (path) => {
        switch (path) {
                case "/" :
                        return _.go(
                            getMenuList()
                            , _.map(menu => `<p><a href="${menu.path}">${menu.menuName}</a></p> `)
                            , _.reduce(_.add)
                            , DefaultLayout
                        )
                case "/admin/menu" :
                        return adminMenuLayout();
                default:
                        return _.go(
                            getTemplate(path)
                            , TemplateLayout
                        )
        }
}

const getTemplate = (path) => get(`/api/template${path}`);
const getMenuList = () => get('/api/menuList');
