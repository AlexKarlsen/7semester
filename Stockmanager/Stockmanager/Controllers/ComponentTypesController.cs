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
    public class ComponentTypesController : Controller
    {
        private readonly IComponentTypeRepository _repository;

        public ComponentTypesController(IComponentTypeRepository repository)
        {
            _repository = repository;
        }

        // GET: ComponentTypes/5
        public async Task<IActionResult> Index(long id)
        {
            ViewData["CategoryId"] = id.ToString();
            return View(await _repository.ListComponentTypesForACategory(id));
        }

        // GET: ComponentTypes/Details/5
        public async Task<IActionResult> Details(long id)
        {
            var componentType = await _repository.GetOneAsync(id);
            if (componentType == null)
            {
                return NotFound();
            }

            return View(componentType);
        }

        // GET: ComponentTypes/Create
        public IActionResult Create()
        { 

            var categoryId = HttpContext.Request.Query["categoryId"].ToString();
            long.TryParse(categoryId, out long categoryIdLong);
            CategoryComponentType CategoryComponentType = new CategoryComponentType() { CategoryId = categoryIdLong };
            var ComponentType = new ComponentType() { CategoryComponentType = new List<CategoryComponentType>() { CategoryComponentType } };
            
            ViewData["CategoryId"] = categoryId;
            return View(ComponentType);
        }

        // POST: ComponentTypes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ComponentTypeId,ComponentName,ComponentInfo,Locaton,Status,Datasheet,ImageUrl,Manufacturer,WikiLink,AdminComment,CategoryComponentType")] ComponentType componentType)
        {
            if (ModelState.IsValid)
            {
                componentType.CategoryComponentType.FirstOrDefault().ComponentTypeId = componentType.ComponentTypeId;
                await _repository.AddAsync(componentType);
                return RedirectToAction("Index");
            }
            return View(componentType);
        }

        // GET: ComponentTypes/Edit/5
        public async Task<IActionResult> Edit(long id)
        {
            var componentType = await _repository.GetOneAsync(id);
            if (componentType == null)
            {
                return NotFound();
            }
            return View(componentType);
        }

        // POST: ComponentTypes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("ComponentTypeId,ComponentName,ComponentInfo,Locaton,Status,Datasheet,ImageUrl,Manufacturer,WikiLink,AdminComment")] ComponentType componentType)
        {
            if (id != componentType.ComponentTypeId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                await _repository.UpdateAsync(componentType);
                return RedirectToAction("Index");
            }
            return View(componentType);
        }

        // GET: ComponentTypes/Delete/5
        public async Task<IActionResult> Delete(long id)
        {
            var componentType = await _repository.GetOneAsync(id);
            if (componentType == null)
            {
                return NotFound();
            }

            return View(componentType);
        }

        // POST: ComponentTypes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var componentType = await _repository.GetOneAsync(id);
            await _repository.DeleteAsync(componentType);
            return RedirectToAction("Index");
        }
    }
}
