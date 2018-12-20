using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ef;
using System.Data;
using System.Data.Entity;

namespace CRUD_W12.Models
{
    public class Banco
    {
        public Contato[] Consultar()
        {
            var db = new Cadastro();
            var result = db.Contatos.SqlQuery("SELECT * FROM contato").ToArray();
            return result;
        }

        public void Cadastrar(Contato c)
        {
            var db = new Cadastro();
            db.Contatos.Create();
            db.Contatos.Add(c);

            db.SaveChanges();
        }

        public void Update(Contato c)
        {
            var db = new Cadastro();
            db.Entry(c).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(Contato c)
        {
            var db = new Cadastro();
            db.Contatos.Attach(c);
            db.Entry(c).State = EntityState.Deleted;
            db.SaveChanges();
        }
    }
}