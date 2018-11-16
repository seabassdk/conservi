import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbCarouselConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  sequence,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [NgbCarouselConfig],  // add NgbCarouselConfig to the component providers
  animations: [
  trigger('enterLogo', [
    state('logoIntro',style({
      border: '1px solid blue',
      height: '50%',
      width: 'auto',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)'
    })),
    transition('void => logoIntro', [ //style({ border: '1px solid red', height: '20%' }),
      animate(2000,  style({ border: '1px solid yellow' }))
      ])
    ]),
    trigger('enterLogoTwo', [
      transition('void => *', [ //style({ border: '1px solid red', height: '20%' }),
        animate(2000,  style({ border: '3px solid yellow', transform: 'translateY(150%)' }))
        ])
      ]),
    trigger('enterLogoThree', [
      state('logoMidState', style({
        top: '25%'
      })),
      transition('void => *', [
        style({ top: '-60%'}),
        sequence([
          animate('2s ease-out', style({ top: '25%'}) )
          // animate('2s 3s', style({ transform: 'rotateY(180deg)'}) ),
          // animate('2s 3s', style({ opacity: '0'}) )
        ])
      ])
    ]),
    trigger('logoRotate', [
      transition('void => *', [
        query('.conservi-logo', [
          style({opacity: '1'}),
          group([
            // animate('2s 2s ease-in', style({ transform: 'rotateY(180deg)'}) ),
            animate('2s 2s', style({ opacity: '0'}) )
          ])
        ])
      ])
    ]),
    trigger('sloganAnim', [
      transition('void => *', [

        query('.logo-back', [
          // style({transform: 'rotateY(-180deg)'}),
          sequence([
            // animate('0.5s', style({ transform: 'rotateY(-180deg)'}) ),
            // animate('4s ease-out', style({ transform: 'rotateY(360deg)'}) ),
            animate('3.5s 2.2s ease-in', style({ opacity: '1'}) ),
            animate('1.5s ease-out', style({ opacity: '0'}) ),
          ])
        ])
      ])
    ]),
    trigger('showOverlay', [
      // state('showingOverlay', style({opacity: '1'})),
      transition(':enter', [
        style({opacity: '1'}),
        animate('3s 3s ease-in', style({ opacity: '0.4'}))
      ])
    ]),
    trigger('showMenu', [
      transition(':enter', [
        animate('2s')
      ])
    ]),
    trigger('test', [
      state('testState', style({
        backgroundColor: 'white', top:'0px', left:'0px', borderRadius:'50% 50% 50% 0'
      })),
      transition('void => testState', [
        animate('4s', keyframes ( [
          style({ backgroundColor: 'white', top:'0px', left:'0px', borderRadius:'0 0 0 0', offset: 0 }),
          style({ backgroundColor: 'red', top:'0px', left:'300px', borderRadius:'50% 0 0 0', offset: 0.25 }),
          style({ backgroundColor: 'green', top:'300px', left:'300px', borderRadius:'50% 50% 0 0', offset: 0.5 }),
          style({ backgroundColor: 'blue', top:'300px', left:'0px', borderRadius:'50% 50% 50% 0', offset: 0.75 }),
          style({ backgroundColor: 'white', top:'0px', left:'0px', borderRadius:'50% 50% 50% 50%', offset: 1 })
        ]))
      ])
    ])

  ]
})
export class MapComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  introEnded: boolean;
  showMenu: boolean;
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(config: NgbCarouselConfig, private router: Router, private modalService: NgbModal) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.introEnded = false;
    this.showMenu = false;
  }

  introAnimationEnd(event){
    this.introEnded = true;
  }

  logoFadeEnd(event){
    this.showMenu = true;

  }

  onAdminClick(){
    this.router.navigate(['/signin']);
  }

  open(x) {
    console.log(this.content);
    this.modalService.open(x, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  execInputResults($event){
    console.log('executing in the parent.');
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      console.log('then result...');
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('then reason...');
    });
  }

}
