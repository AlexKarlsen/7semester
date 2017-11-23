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
        private readonly ICategoryComponentTypesRepository _mappingRepository;

        public ComponentTypesController(IComponentTypeRepository repository, ICategoryComponentTypesRepository mappingRepository)
        {
            _repository = repository;
            _mappingRepository = mappingRepository;
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
            var ComponentType = new ComponentType() { CategoryId = categoryIdLong };
            //ViewData["CategoryId"] = categoryId;
            return View(ComponentType);
        }

        // POST: ComponentTypes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ComponentTypeId,ComponentName,ComponentInfo,Locaton,Status,Datasheet,ImageUrl,Manufacturer,WikiLink,AdminComment,CategoryId")] ComponentType componentType)
        {
            if (ModelState.IsValid)
            {
                //componentType.CategoryComponentType.FirstOrDefault().ComponentTypeId = componentType.ComponentTypeId;
                var trackedChanges = await _repository.AddAsync(componentType);
                var newComponentType = trackedChanges.Entity as ComponentType;
                var mapCategoryComponentType = new CategoryComponentType() { CategoryId = componentType.CategoryId, ComponentTypeId = newComponentType.ComponentTypeId };
                await _mappingRepository.AddAsync(mapCategoryComponentType);
                return RedirectToAction("Index", new { id = componentType.CategoryId });
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
