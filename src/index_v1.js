//modules
import React from 'react';
import {observable, computed, autorun, decorate, when} from 'mobx';
import { render } from 'react-dom';
import {Provider} from 'mobx-react';
//class
import App from './component/App';
        
class Maison{
    @observable surface = 90;
    @observable hauteur = 12;
    @observable portes = ["p1","p2"];

    @computed get volume(){
        return this.surface * this.hauteur;
    }
     
    @computed get nbEntrees(){
        return this.portes.length;
    }
}

const MA_MAISON = new Maison();

autorun(function(){
    console.log(`La surface a changé : ${MA_MAISON.surface}`);
})

autorun(function(){
    console.log(`La hauteur a changé : ${MA_MAISON.hauteur}`);
})

autorun(function(){
    console.log(`Le volume a changé : ${MA_MAISON.volume}`);
})

autorun(function(){
    console.log(`Le nombre de portes a changé : ${MA_MAISON.nbEntrees}`);
})

when(
    () => MA_MAISON.volume > 2000, 
    () => console.log('le volume de la maison a dépassé 2000')
);

render(
    <Provider monSuperStore={MA_MAISON}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

setInterval( () => {
    
    console.log('Incrémentation de la surface de MA_MAISON');
    MA_MAISON.surface += 30;

    console.log('Incrémentation de la hauteur de MA_MAISON');
    MA_MAISON.hauteur += 30;

    console.log('Ajout d’une nouvelle porte à MA_MAISON');
    MA_MAISON.portes.push("p3");
    
}, 60000);