import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]]
    });

    this.passwordForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordStrength(value);
    });
  }

  passwordStrength: string = 'empty';

  updatePasswordStrength(password: string) {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

    if (hasLetters || hasDigits || hasSymbols ) {
      this.passwordStrength = 'easy';
    }

    if ((hasLetters && hasSymbols && password.length >= 8) ||
      (hasLetters && hasDigits && password.length >= 8) ||
      (hasDigits && hasSymbols && password.length >= 8)) {
      this.passwordStrength = 'medium';
    }
    if (hasLetters && hasDigits && hasSymbols && password.length >= 8) {
      this.passwordStrength = 'strong';
    }
    if (password.length < 8) {
      this.passwordStrength = 'short';
    }
    if (password.length === 0) {
      this.passwordStrength = 'empty';
    }
  }
}
