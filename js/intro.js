import { gsap } from 'gsap';

const DOM = {
    content: document.querySelector('.content'),
    enterCtrl: document.querySelector('.enter'),
    enterBackground: document.querySelector('.enter__bg')
};

export class Intro {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.circleText = [...this.DOM.el.querySelectorAll('text.circles__text')];
        this.circleTextTotal = this.DOM.circleText.length;
        
        this.setup();
    }
    setup() {
        gsap.set(this.DOM.circleText, { transformOrigin: '50% 50%' });
        gsap.set([this.DOM.circleText, DOM.content.children], {opacity: 0});
        gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});

        this.initEvents();
    }
    initEvents() {
        this.enterMouseEnterEv = () => {
            gsap.killTweensOf([DOM.enterBackground,this.DOM.circleText]);
            
            gsap.to(DOM.enterBackground, {
                duration: 1.3,
                ease: 'expo',
                scale: 1.4
            });
            gsap.to(this.DOM.circleText, {
                duration: 0.5,
                ease: 'expo',
                rotation: '+=120',
                scale: 0.7,
                opacity: 0.2,
                stagger: {
                    amount: -0.15
                }
            });
        };
        this.enterMouseLeaveEv = () => {
            //gsap.killTweensOf([DOM.enterBackground,this.DOM.circleText]);
            
            gsap.to(DOM.enterBackground, {
                duration: 2,
                ease: 'elastic.out(1, 0.4)',
                scale: 1
            });
            gsap.to(this.DOM.circleText, {
                duration: 2,
                ease: 'elastic.out(1, 0.4)',
                scale: 1,
                rotation: '-=120',
                opacity: 1,
                stagger: {
                    amount: 0.15
                }
            });
        };
        DOM.enterCtrl.addEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.addEventListener('mouseleave', this.enterMouseLeaveEv);

        this.enterClickEv = () => this.enter();
        DOM.enterCtrl.addEventListener('click', this.enterClickEv);
    }
    start() {
        this.startTL = gsap.timeline()
        .addLabel('start', 0)
        .to(this.DOM.circleText, {
            duration: 3,
            ease: 'expo.inOut',
            rotation: 90,
            stagger: {
                amount: 0.4
            }
        }, 'start')
        .to([this.DOM.circleText, DOM.enterCtrl], {
            duration: 3,
            ease: 'expo.inOut',
            startAt: {opacity: 0, scale: 0.8},
            scale: 1,
            opacity: 1,
            stagger: {
                amount: 0.4
            }
        }, 'start')
        .add(() => {
            gsap.set(DOM.enterCtrl, {pointerEvents: 'auto'});
        }, 'start+=2');
    }
    enter() {
        this.startTL.kill();

        DOM.enterCtrl.removeEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.removeEventListener('mouseleave', this.enterMouseLeaveEv);
        gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});

        gsap.set([DOM.content], {opacity: 1});

        gsap.timeline()
        .addLabel('start', 0)
        .to(DOM.enterCtrl, {
            duration: 0.6,
            ease: 'back.in',
            scale: 0.2,
            opacity: 0
        }, 'start')
        .to(this.DOM.circleText, {
            duration: 0.8,
            ease: 'back.in',
            scale: 1.6,
            opacity: 0,
            rotation: '-=20',
            stagger: {
                amount: 0.3
            }
        }, 'start')
        .to([DOM.content.children], {
            duration: 0.8,
            ease: 'back.out',
            startAt: {opacity: 0, scale: 0.8},
            scale: 1,
            opacity: 1,
            stagger: {
                amount: 0.2
            }
        }, 'start+=1')
    }
}