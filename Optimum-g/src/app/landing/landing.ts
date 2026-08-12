import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormItem } from '../../models/form-item.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing.html'
})
export class LandingPageComponent {
  searchQuery: string = '';
  selectedCategory: string = 'All';

  categories: string[] = ['All', 'Security & IT', 'Operations', 'Finance'];

  formsList: FormItem[] = [
    {
      id: '1',
      title: 'IT Troubleshooting Form',
      description: 'CLick and Fill The Form To Diagnose Device',
      category: 'Security & IT',
      routePath: '/forms/troubleshooting',
      badge: 'Popular'
    },
    {
      id: '2',
      title: 'IT Replacement Form',
      description: 'Kindly Fill The Form To Immediately Replace Device',
      category: 'Security & IT',
      routePath: '/forms/replacement',
      badge: 'Urgent'
    }
    {
      id: '3',
      title: 'IT Infrastructure Form',
      description: 'Kindly Keep Record Of All Infrastructures',
      category: 'Security & IT',
      routePath: '/forms/infrastructure',
      badge: 'Urgent'
    }
  ];

  get filteredForms(): FormItem[] {
    return this.formsList.filter(form => {
      const matchesSearch = form.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            form.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || form.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}