import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolver/member-details.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members',
                component: MemberListComponent,
                 resolve: { users: MemberListResolver }
            },
            {
                path: 'members/:id',
                component: MemberDetailComponent,
                resolve: { user: MemberDetailsResolver }
            },
            {
                path: 'messages',
                component: MessagesComponent
            },
            {
                path: 'lists',
                component: ListComponent
            }
        ]
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
