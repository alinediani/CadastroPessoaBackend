using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CadastroPessoa;

[Route("api/pessoas")]
[ApiController]
public class PessoasController : ControllerBase
{
    private readonly Context _context;

    public PessoasController(Context context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetPessoas()
    {
        var pessoas = await _context.Pessoas.ToListAsync();
        return Ok(pessoas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound();

        return Ok(pessoa);
    }

    [HttpPost]
    public async Task<IActionResult> PostPessoa([FromBody] Pessoa pessoa)
    {
        if (ModelState.IsValid)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPessoa), new { id = pessoa.Id }, pessoa);
        }

        return BadRequest(ModelState);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPessoa(int id, [FromBody] Pessoa pessoa)
    {
        if (id != pessoa.Id)
            return BadRequest();

        _context.Entry(pessoa).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PessoaExists(id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PessoaExists(int id)
    {
        return _context.Pessoas.Any(e => e.Id == id);
    }
}
