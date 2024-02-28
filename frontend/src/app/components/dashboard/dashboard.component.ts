import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.type";
import {Technology} from "../../models/technology.type";
import {catchError, finalize, map, Observable, toArray} from "rxjs";
import {ThreeMFLoader} from "three/examples/jsm/loaders/3MFLoader";
import {Converted, reConvertTypeMaturity, typeMaturityConverter} from "../../helpers/type-maturity.helper";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    technologies: Technology[] | null = null;
    baseurl: string = 'http://localhost:3000/technologies/';
    user: User | null = null;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
      this.user = this.auth.getCurrentUser();
    }

    ngOnInit() {
        if (!this.auth.getCurrentUser() && this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
        }
        this.fetchTechnologies()
    }
    fetchTechnologies() {

      // @ts-ignore
      let endpoint: string | null = `${this.baseurl}/getByOrg/${this.auth.getCurrentUser()?.organisation_id?._id}`;

      // @ts-ignore
      if (this.auth.getCurrentUser()?.role  === "sysadmin") {
        endpoint = this.baseurl;
      }

      if (this.auth.getCurrentUser()?.role === 'user') {
        // @ts-ignore
        endpoint = `${this.baseurl}getByOrg/${this.auth.getCurrentUser()?.organisation_id?._id}/isPublished`
      }

      let res = this.http.get<Technology[]>(endpoint, {headers: this.auth.getHeaders()});

      res.pipe().subscribe((technologies: Technology[]) => {
        this.technologies = technologies;
        this.technologies.map((technology: Technology) => {
          const converted: Converted = typeMaturityConverter(technology);
          technology.type = converted.type;
          technology.maturity = converted.maturity;
        })
        this.createScene();
      })
    }

    onDelete(id: string) {
      if(confirm("Are you sure?")) {
        const endpoint = `${this.baseurl}${id}`;
        let res = this.http.delete<Technology>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((response: any) => {
          this.fetchTechnologies()
        })
      }
    }

  createScene() {
    const radar = document.getElementById('technology-radar') as HTMLCanvasElement;
    const ctx = radar.getContext('2d');
    radar.width = radar.width / 2;

    const centerX = radar.width / 2;
    const centerY = radar.height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.9;

    if (ctx) {
      ctx.clearRect(0, 0, radar.width, radar.height);
    }

    for (let i = 1; i <= 4; i++) {
      const startAngle = 0;
      const endAngle = Math.PI * 2;
      const startRadius = maxRadius * (i / 4);
      if (ctx) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, startRadius, startAngle, endAngle);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(radar.width, centerY);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, radar.height);
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }

    const Types: { [key: string]: { [key: string]: number } } = {
        1: {
          'x-start': 0,
          'x-end': 0.5,
          'y-start': 0,
          'y-end': 0.5,
        },
        2: {
          'x-start': 0,
          'x-end': 0.5,
          'y-start': 0.5,
          'y-end': 1,
        },
        3: {
          'x-start': 0.5,
          'x-end': 1,
          'y-start': 0.5,
          'y-end': 1,
        },
        4: {
          'x-start': 0.5,
          'x-end': 1,
          'y-start': 0,
          'y-end': 0.5,
        }
    }

    const maturities: { [key: string]: { [key: string]: number } } = {
      1: {
        'start': 0,
        'end': 0.25
      },
      2: {
        'start': 0.25,
        'end': 0.5
      },
      3: {
        'start': 0.5,
        'end': 0.75
      },
      4: {
        'start': 0.75,
        'end': 1
      }
    }


    const drawTechnology = (x: number, y: number) => {
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 2, 2);
      }
    }
    const calculatePosition = (t: string, m: string): { x: number, y: number } => {
      const typeX = Types[t]["x-start"] * radar.width + (Types[t]['x-end'] - Types[t]['x-start']) * radar.width * Math.random();
      const typeY = Types[t]['y-start'] * radar.height + (Types[t]['y-end'] - Types[t]['y-start']) * radar.height * Math.random();
      const maturityX = maturities[m]['start'] * radar.width + (maturities[m]['end'] - maturities[m]['start']) * radar.width * Math.random();
      const maturityY = maturities[m]['start'] * radar.height + (maturities[m]['end'] - maturities[m]['start']) * radar.height * Math.random();

      return {
        x: typeX + maturityX,
        y: typeY + maturityY
      };
    };

    if (this.technologies) {
      this.technologies?.forEach((tech) => {
        let tmpTech: Technology = JSON.parse(JSON.stringify(tech));
        const reconvert: Converted = reConvertTypeMaturity(tech)
        tmpTech.maturity = reconvert.maturity;
        tmpTech.type = reconvert.type;
        const { type, maturity } = tmpTech;
        const { x, y } = calculatePosition(type, maturity);
        drawTechnology(x, y);
      })
    }
  }

}
