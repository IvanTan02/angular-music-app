import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss'
})
export class AppButtonComponent {

  @Input() text: string = '';
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() color: string = '';
  @Input() backgroundColor: string = '';
  @Input() href: string = '';

  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  buttonClicked() {
    if (!this.isDisabled && !this.isLoading) this.onClick.emit();
  }
}
