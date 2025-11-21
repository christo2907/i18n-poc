import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private translate: TranslateService, private http: HttpClient) {
    const browserLang = navigator.language.split('-')[0];
    const lang = ['en', 'ta', 'hi','ja'].includes(browserLang) ? browserLang : 'en';
    this.loadLanguage(lang);
  }

  async loadLanguage(lang: string) {
    const data = await firstValueFrom(
      this.http.get<Record<string, string>>(`/assets/i18n/${lang}.json`)
    );
    this.translate.setTranslation(lang, data, true); // merge = true
    this.translate.use(lang);
  }

  switchLang(lang: string) {
    this.loadLanguage(lang);
  }
}
