import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginResolver } from '../login/login.resolver';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ApplicationComponent } from './component/application/application.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DiscountComponent } from './component/discount/discount.component';
import { HomeComponent } from './component/home/home.component';
import { MainPageSiteComponent } from './component/main-page-site/main-page-site.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { ProfileComponent } from './component/profile/profile.component';
import { QuestionComponent } from './component/question/question.component';
import { ReciterComponent } from './component/reciter/reciter.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { UploadComponent } from './component/upload/upload.component';





const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { 
      path: '',
      component: HomeComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'app',
      component: ApplicationComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
       children: [
        {
          path: ':details',
          component: ApplicationComponent
        },
       ]
    },
    { 
      path: 'main',
      component: MainPageSiteComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'contact-us',
      component: ContactUsComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'about-us',
      component: AboutUsComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'question-answer',
      component: QuestionComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'profile',
      component: ProfileComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'upload',
      component: UploadComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'reciter',
      component: ReciterComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'profile',
      component: ProfileComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'discount',
      component: DiscountComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'subscription',
      component: SubscriptionComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
    { 
      path: 'privacy',
      component: PrivacyComponent,
      data: { route: 'dashboard' },
      resolve: { 'hasCookie': LoginResolver},
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
