using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CadastroPessoa
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public DbSet<Pessoa> Pessoas { get; init; }
    }
}
