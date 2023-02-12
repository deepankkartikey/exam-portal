package com.exam.controller;

import com.exam.model.exam.Category;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // add category
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category newCategory = this.categoryService.addCategory(category);
        return ResponseEntity.ok(newCategory);
    }

    // get category
    @GetMapping("{categoryId}")
    public Category getCategory(@PathVariable("categoryId") Long categoryId){
        return this.categoryService.getCategory(categoryId);
    }

    // get all categories
    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    // update category
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category){
        return this.categoryService.updateCategory(category);
    }

    // delete category
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }
}
