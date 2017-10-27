using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Stockmanager.Models;
using Stockmanager.Interfaces;

namespace Stockmanager.Controllers
{
    public class ComponentsController : Controller
    {
        private readonly IComponentRepository _repository;

        public ComponentsController(IComponentRepository repository)
        {
            _repository = repository;    
        }

        // GET: Components
        public async Task<IActionResult> Index(long componentTypeId)
        {
            return View(await _repository.ListComponentsForAComponentType(componentTypeId));
        }

        // GET: Components/Details/5
        public async Task<IActionResult> Details(long id)
        {
            var component = await _repository.GetOneAsync(id);
            if (component == null)
            {
                return NotFound();
            }

            return View(component);
        }

        // GET: Components/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Components/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ComponentId,ComponentTypeId,ComponentNumber,SerialNo,Status,AdminComment,UserComment,CurrentLoanInformationId")] Component component)
        {
            if (ModelState.IsValid)
            {
                await _repository.AddAsync(component);
                return RedirectToAction("Index");
            }
            return View(component);
        }

        // GET: Components/Edit/5
        public async Task<IActionResult> Edit(long id)
        {
            var component = await _repository.GetOneAsync(id);
            if (component == null)
            {
                return NotFound();
            }
            return View(component);
        }

        // POST: Components/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("ComponentId,ComponentTypeId,ComponentNumber,SerialNo,Status,AdminComment,UserComment,CurrentLoanInformationId")] Component component)
        {
            if (id != component.ComponentId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                await _repository.UpdateAsync(component);
                return RedirectToAction("Index");
            }
            return View(component);
        }

        // GET: Components/Delete/5
        public async Task<IActionResult> Delete(long id)
        {
            var component = await _repository.GetOneAsync(id);
            if (component == null)
            {
                return NotFound();
            }

            return View(component);
        }

        // POST: Components/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var component = await _repository.GetOneAsync(id);
            await _repository.DeleteAsync(component);
            return RedirectToAction("Index");
        }
    }
}
