const defaultEventFailureGracePeriod = 100;

export default async (element, expectedDuration, type, eventFailureGracePeriod) => {
    await new Promise(resolve => {
        const transitionend = getTransitionEndEvent(type);
        const gracePeriod = eventFailureGracePeriod !== undefined ?
            eventFailureGracePeriod :
            defaultEventFailureGracePeriod;
        let done = false;
        let forceEnd = false;

        element.addEventListener(transitionend, onTransitionEnd);

        setTimeout(() => {
            if (!done) {
                // forcing onTransitionEnd callback...
                forceEnd = true;
                onTransitionEnd();
            }else{
                resolve();
            }
        }, expectedDuration + gracePeriod);

        function onTransitionEnd(e) {
            if (forceEnd || e.target === element) {
                done = true;
                element.removeEventListener(transitionend, onTransitionEnd);
                resolve();
            }
        }
    });
}


function getTransitionEndEvent(type) {
    let types;
    if ( type && ('transition' === type || 'trans' === type) ) {
        types = {
            'OTransition':      'oTransitionEnd',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition':    'transitionend',
            'transition':       'transitionend'
        }
    }
    else { // animation is default
        types = {
            'OAnimation':      'oAnimationEnd',
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation':    'animationend',
            'animation':       'animationend'
        }
    }
    var elem = document.createElement('fake');
    return Object.keys(types).reduce(function (prev, trans) {
        return undefined !== elem.style[trans]? types[trans]: prev
    }, '');
}