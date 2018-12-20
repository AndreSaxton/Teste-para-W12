using CRUD_W12.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUD_W12.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void Index(ef.Contato c)
        {
            var bd = new Banco();
            bd.Cadastrar(c);

            Index();
        }

        [HttpPost]
        public ActionResult AddContato(ef.Contato c)
        {
            var bd = new Banco();
            bd.Cadastrar(c);

            //  Send "Success"
            return Json(new { success = true, responseText = "Cadastro realizado com sucesso!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateContato(ef.Contato c)
        {
            var bd = new Banco();
            bd.Update(c);

            //  Send "Success"
            return Json(new { success = true, responseText = "Cadastro atualizado com sucesso!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteContato(ef.Contato c)
        {
            var bd = new Banco();
            bd.Delete(c);

            //  Send "Success"
            return Json(new { success = true, responseText = "Cadastro deletado com sucesso!" }, JsonRequestBehavior.AllowGet);
        }

        public string SearchContato()
        {
            var bd = new Banco();
            var contatos = bd.Consultar();
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(contatos);
            return json;
        }
    }
}