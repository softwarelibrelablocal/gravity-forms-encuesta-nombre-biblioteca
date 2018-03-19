var idformulario = '8';
var validaciones = '0,4,5,6,7,9,10';

var numero_votos = 1;

var modal_panel = '';

jQuery(function() {
	
	jQuery(".validacion input").val('0');
	
	//Fecha de nacimiento
	jQuery(".fecha_nacimiento input").change(function() {
		validar_formulario(false);
		lanzar_gfvalidacion(idformulario,validaciones);
		
	});	
	//DNI
	jQuery(".dni input").change(function() {
		validar_formulario(false);
		lanzar_gfvalidacion(idformulario,validaciones);
	});
	
	// NIE	
	jQuery(".nie input").change(function() {
		validar_formulario(false);
		lanzar_gfvalidacion(idformulario,validaciones);
	});

	//combo tipo de documento
	jQuery(".tipo_documento select").change(function() {
		jQuery(".validacion input").val('0');		
		lanzar_gfvalidacion(idformulario,validaciones);
		
	});
	
	
	//Boton validar formulario
	jQuery("#btn_validar").click(function() {
		jQuery(".validacion input").val('-1');
		validar_formulario(true);
		lanzar_gfvalidacion(idformulario,validaciones);		
		jQuery(".validacion input").val('0');
	});

	quitar_seleccion();
	
	jQuery('.prioridades__imagen img').css('opacity','0');
	
	jQuery('.lista__elemento').clic
	
	jQuery(".lista__elemento").click(function(event) {		
	
		var idvoto = jQuery(this).attr('idvoto');
		var nombre = jQuery(this).attr('nombre');
		
		votar(idvoto,nombre);
		return false;
	});
	
	jQuery("#btn_borrar").click(function(event) {	
		quitar_seleccion();
	});
	
	var ancho_imagen = jQuery('#lista__imagen1').width();
	
	//jQuery('.lista__elemento').css('height',ancho_imagen * 1.2 + 'px');
	
	modal_panel = jQuery('[data-remodal-id=modal]') .remodal();
	
	jQuery(".ficha__masinfo").click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		abrir_popup(jQuery(this).attr('rel'));
		modal_panel.open();
		return false;
	});

});

function votar(id_video,nombre){
	//alert(numero_votos);
	if(numero_votos > 3){
		abrir_popumensaje('Ya ha elegido las tres opciones. Puede enviar la propuesta.');
		//alert("Ya ha elegido las tres opciones. Puede enviar la propuesta.");
		return false;
	}
	
	if(id_video == jQuery("#input_8_1").val() || id_video == jQuery("#input_8_2").val() || id_video == jQuery("#input_8_3").val() ){
		abrir_popumensaje('Esta escritora ya ha sido seleccionada. Elija otra.');
		//alert("Esta escritora ya ha sido seleccionada. Elija otra.");
		return false;
	}	
	
	/*
	var aux = '';
	
	if(numero_votos > 0){
		aux = '-';		
	}else{
		aux = '';
	}
	var valores_votos = jQuery("valores_votos").val();
	
	
	jQuery("#valores_votos").val('' + aux + valores_votos);
	*/
	
	
	jQuery("#input_8_" + numero_votos).val(id_video);  
	
	
	//jQuery("#voto_" + numero_votos).html('<div style="height:180px;"><img src="http://www.rivasaldia.tv/inicio/images/kf/16_9/' + id_video + '.jpg" width="180" height="101"><br><p style="padding: 0;">' + titulo + '</p></div>');
	
	jQuery('#prioridades__imagen' + numero_votos).css("opacity", "0"); 
	
	jQuery('#prioridades__imagen' + numero_votos).attr('src','https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora' + id_video + '.jpg');
	
	jQuery('#prioridades__imagen' + numero_votos).css("opacity", "0"); 
	
	
	jQuery('#nombre' + numero_votos).html(nombre);
	
	if(numero_votos == 3){
		jQuery(".validacion2 input").val('500');
		//jQuery('#gform_submit_button_8').
	 }else{
		jQuery(".validacion2 input").val('0');
	 }
	
	
	desplazar_votacion(numero_votos);
	
	numero_votos = numero_votos + 1;
	 
	lanzar_gfvalidacion(idformulario,validaciones);
    
    return true;
	
}


function quitar_seleccion(){
	jQuery("#input_8_1").val('');
	jQuery("#input_8_2").val('');
	jQuery("#input_8_3").val('');
	
	quitar_opacidad(1);
	quitar_opacidad(2);
	quitar_opacidad(3);
	
	jQuery('#nombre1').html('?');
	jQuery('#nombre2').html('?');
	jQuery('#nombre3').html('?');
	
	jQuery(".validacion2 input").val('0');
	
	
	//lanzar validaciones
	//jQuery("#boton_votar_videos").hide();
	
	numero_votos = 1;
	
	lanzar_gfvalidacion(idformulario,validaciones);
}




function desplazar_votacion(id){
	/*
	jQuery('html, body').animate({
        scrollTop: jQuery("#contenedor_votos").offset().top
    }, 1000);
    */
	
	
	jQuery('.entradilla').ScrollTo({
	    duration: 1000,
	    callback: function(){
	    	 opacidad(id);
	    	 if(id == 3){
	    		//jQuery("#boton_votar_videos").show();
				//lanzar validaciones gravity
	    	}else{
	    		//jQuery("#boton_votar_videos").hide();
	    	}
	    }
	});
}

function opacidad(id){
	jQuery("#prioridades__imagen" + id).css("opacity", "1"); 
}

function quitar_opacidad(id){
	jQuery("#prioridades__imagen" + id).css("opacity", "0"); 
}

//reglas_campos es un string con las reglas de los campos a lazar (Ej: '0,4,8'). El cero siempre se pone porque es la validacion del boton submit
function lanzar_gfvalidacion(id_formulario,reglas_campos){
	if(typeof __gf_timeout_handle !== "undefined"){
		clearTimeout(__gf_timeout_handle);
	}
	__gf_timeout_handle = setTimeout("gf_apply_rules(" + id_formulario + ",[" + reglas_campos + "])", 300);
}

function left_pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}






















/*global define:false require:false */
(function (name, context, definition) {
	if (typeof module != 'undefined' && module.exports) module.exports = definition();
	else if (typeof define == 'function' && define.amd) define(definition);
	else context[name] = definition();
})('jquery-scrollto', this, function(){
	// Prepare
	var jQuery, $, ScrollTo;
	jQuery = $ = window.jQuery || require('jquery');

	// Fix scrolling animations on html/body on safari
	$.propHooks.scrollTop = $.propHooks.scrollLeft = {
		get: function(elem,prop) {
			var result = null;
			if ( elem.tagName === 'HTML' || elem.tagName === 'BODY' ) {
				if ( prop === 'scrollLeft' ) {
					result = window.scrollX;
				} else if ( prop === 'scrollTop' ) {
					result = window.scrollY;
				}
			}
			if ( result == null ) {
				result = elem[prop];
			}
			return result;
		}
	};
	$.Tween.propHooks.scrollTop = $.Tween.propHooks.scrollLeft = {
		get: function(tween) {
			return $.propHooks.scrollTop.get(tween.elem, tween.prop);
		},
		set: function(tween) {
			// Our safari fix
			if ( tween.elem.tagName === 'HTML' || tween.elem.tagName === 'BODY' ) {
				// Defaults
				tween.options.bodyScrollLeft = (tween.options.bodyScrollLeft || window.scrollX);
				tween.options.bodyScrollTop = (tween.options.bodyScrollTop || window.scrollY);

				// Apply
				if ( tween.prop === 'scrollLeft' ) {
					tween.options.bodyScrollLeft = Math.round(tween.now);
				}
				else if ( tween.prop === 'scrollTop' ) {
					tween.options.bodyScrollTop = Math.round(tween.now);
				}

				// Apply
				window.scrollTo(tween.options.bodyScrollLeft, tween.options.bodyScrollTop);
			}
			// jQuery's IE8 Fix
			else if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	// jQuery ScrollTo
	ScrollTo = {
		// Configuration
		config: {
			duration: 400,
			easing: 'swing',
			callback: undefined,
			durationMode: 'each',
			offsetTop: 0,
			offsetLeft: 0
		},

		// Set Configuration
		configure: function(options){
			// Apply Options to Config
			$.extend(ScrollTo.config, options||{});

			// Chain
			return this;
		},

		// Perform the Scroll Animation for the Collections
		// We use $inline here, so we can determine the actual offset start for each overflow:scroll item
		// Each collection is for each overflow:scroll item
		scroll: function(collections, config){
			// Prepare
			var collection, $container, container, $target, $inline, position, containerTagName,
				containerScrollTop, containerScrollLeft,
				containerScrollTopEnd, containerScrollLeftEnd,
				startOffsetTop, targetOffsetTop, targetOffsetTopAdjusted,
				startOffsetLeft, targetOffsetLeft, targetOffsetLeftAdjusted,
				scrollOptions,
				callback;

			// Determine the Scroll
			collection = collections.pop();
			$container = collection.$container;
			$target = collection.$target;
			containerTagName = $container.prop('tagName');

			// Prepare the Inline Element of the Container
			$inline = $('<span/>').css({
				'position': 'absolute',
				'top': '0px',
				'left': '0px'
			});
			position = $container.css('position');

			// Insert the Inline Element of the Container
			$container.css({position:'relative'});
			$inline.appendTo($container);

			// Determine the top offset
			startOffsetTop = $inline.offset().top;
			targetOffsetTop = $target.offset().top;
			targetOffsetTopAdjusted = targetOffsetTop - startOffsetTop - parseInt(config.offsetTop,10);

			// Determine the left offset
			startOffsetLeft = $inline.offset().left;
			targetOffsetLeft = $target.offset().left;
			targetOffsetLeftAdjusted = targetOffsetLeft - startOffsetLeft - parseInt(config.offsetLeft,10);

			// Determine current scroll positions
			containerScrollTop = $container.prop('scrollTop');
			containerScrollLeft = $container.prop('scrollLeft');

			// Reset the Inline Element of the Container
			$inline.remove();
			$container.css({position:position});

			// Prepare the scroll options
			scrollOptions = {};

			// Prepare the callback
			callback = function(event){
				// Check
				if ( collections.length === 0 ) {
					// Callback
					if ( typeof config.callback === 'function' ) {
						config.callback();
					}
				}
				else {
					// Recurse
					ScrollTo.scroll(collections,config);
				}
				// Return true
				return true;
			};

			// Handle if we only want to scroll if we are outside the viewport
			if ( config.onlyIfOutside ) {
				// Determine current scroll positions
				containerScrollTopEnd = containerScrollTop + $container.height();
				containerScrollLeftEnd = containerScrollLeft + $container.width();

				// Check if we are in the range of the visible area of the container
				if ( containerScrollTop < targetOffsetTopAdjusted && targetOffsetTopAdjusted < containerScrollTopEnd ) {
					targetOffsetTopAdjusted = containerScrollTop;
				}
				if ( containerScrollLeft < targetOffsetLeftAdjusted && targetOffsetLeftAdjusted < containerScrollLeftEnd ) {
					targetOffsetLeftAdjusted = containerScrollLeft;
				}
			}

			// Determine the scroll options
			if ( targetOffsetTopAdjusted !== containerScrollTop ) {
				scrollOptions.scrollTop = targetOffsetTopAdjusted;
			}
			if ( targetOffsetLeftAdjusted !== containerScrollLeft ) {
				scrollOptions.scrollLeft = targetOffsetLeftAdjusted;
			}

			// Check to see if the scroll is necessary
			if ( $container.prop('scrollHeight') === $container.width() ) {
				delete scrollOptions.scrollTop;
			}
			if ( $container.prop('scrollWidth') === $container.width() ) {
				delete scrollOptions.scrollLeft;
			}

			// Perform the scroll
			if ( scrollOptions.scrollTop != null || scrollOptions.scrollLeft != null ) {
				$container.animate(scrollOptions, {
					duration: config.duration,
					easing: config.easing,
					complete: callback
				});
			}
			else {
				callback();
			}

			// Return true
			return true;
		},

		// ScrollTo the Element using the Options
		fn: function(options){
			// Prepare
			var collections, config, $container, container;
			collections = [];

			// Prepare
			var	$target = $(this);
			if ( $target.length === 0 ) {
				// Chain
				return this;
			}

			// Handle Options
			config = $.extend({},ScrollTo.config,options);

			// Fetch
			$container = $target.parent();
			container = $container.get(0);

			// Cycle through the containers
			while ( ($container.length === 1) && (container !== document.body) && (container !== document) ) {
				// Check Container for scroll differences
				var containerScrollTop, containerScrollLeft;
				containerScrollTop = $container.css('overflow-y') !== 'visible' && container.scrollHeight !== container.clientHeight;
				containerScrollLeft =  $container.css('overflow-x') !== 'visible' && container.scrollWidth !== container.clientWidth;
				if ( containerScrollTop || containerScrollLeft ) {
					// Push the Collection
					collections.push({
						'$container': $container,
						'$target': $target
					});
					// Update the Target
					$target = $container;
				}
				// Update the Container
				$container = $container.parent();
				container = $container.get(0);
			}

			// Add the final collection
			collections.push({
				'$container': $('html'),
				// document.body doesn't work in firefox, html works for all
				// internet explorer starts at the beggining
				'$target': $target
			});

			// Adjust the Config
			if ( config.durationMode === 'all' ) {
				config.duration /= collections.length;
			}

			// Handle
			ScrollTo.scroll(collections,config);

			// Chain
			return this;
		}
	};

	// Apply our extensions to jQuery
	$.ScrollTo = $.ScrollTo || ScrollTo;
	$.fn.ScrollTo = $.fn.ScrollTo || ScrollTo.fn;

	// Export
	return ScrollTo;
});










function validar_formulario(es_boton){
	
	var dni = jQuery('.dni input').val();
	var nie = jQuery('.nie input').val().toUpperCase();
	var fechanac = jQuery('.fecha_nacimiento input').val();
	var tipo_documento = jQuery( ".tipo_documento select option:selected" ).val();

	jQuery(".validacion input").val('0');

	
	
	if(tipo_documento == 'DNI' && dni != ''){
		documento = left_pad(dni, 9);
		jQuery(".nie input").val('');
	}else{
		documento = nie;
		jQuery(".dni input").val('');
	}
	
	//validar fecha
	if(!validar_edad(fechanac)){
		
		return false;
	}

	if(documento != '' && fechanac != ''){
		validar_webservice(documento,fechanac);
		return true;
	}else{
		if(documento == '' && es_boton){
			jQuery(".validacion input").val('0');
			var mensaje = 'Por favor, rellene el número del documento de identidad';
			jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">' + mensaje + '</div><div style="clear: both;"></div>');
			jQuery('#mensaje_validacion').show();
			return false;
		}
	}

	return false;
}

function validar_edad(fechanac) {
	var edadActual = 0;	
		
	if (fechanac != '') {
		var edadActual = calcularEdad(fechanac);
		if (edadActual >= 16) {
			//jQuery(".validacion input").val('500');
			jQuery('#mensaje_validacion').html('');
			return true;
		} else {
			jQuery(".validacion input").val('0');
			var mensaje = 'Para inscribirse en este concurso debe tener 16 años o más';
			jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">' + mensaje + '</div><div style="clear: both;"></div>');
			jQuery('#mensaje_validacion').show();
			return false;
		}
	} else {
		jQuery(".validacion input").val('0');
		var mensaje = 'Por favor, rellene la fecha de nacimiento';
		jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">' + mensaje + '</div><div style="clear: both;"></div>');
		jQuery('#mensaje_validacion').show();
		return false;
	}
}

function validar_webservice(documento, fechanac){

	if (documento == '') {
		jQuery(".validacion input").val('0');
		var mensaje = 'Por favor, rellene el número del documento de identidad';
		jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">' + mensaje + '</div><div style="clear: both;"></div>');
		jQuery('#mensaje_validacion').show();
		return false;
	}else{
		consulta_webservice(documento, fechanac);
		return true;
	}
	return false;
}

function consulta_webservice(documento, fechanac){
		
		if(documento != '' && fechanac != ''){			
			buscaDniNie(documento,fechanac);
			return true;			
		}
		return false;
}

function buscaDniNie(documento,fechanac) {
	var mensaje = '';
	
	jQuery('#mensaje_validacion').show();
	
	jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/animation_loading-1.gif" width="50" border="0"></div><div class="mensaje_error_texto">Validando datos...</div><div style="clear: both;"></div>');

	//llamada ajax al webservice
	//var url = "http://10.194.100.140/json/wp-json/mg-dbq2json/v1/services?s=padron_dni&u=3gawegwegr65&dni=" + documento + "&fechanac=" + fechanac;
	
	var url = "http://10.194.100.140/mgdbq2json/wp-json/json/v1/services?s=padron_dni_barrio&u=34tergeg2&dni=" + documento + "&fechanac=" + fechanac;
	
	var parametros = {"url" : url};
	
	jQuery.ajax({
		data:  parametros,
		type : 'POST',
		url: "https://encuestasciudadanas.rivasciudad.es/proxywebservice/",
		beforeSend: function () {
		},
		success:  function (response) {
			var error = 0;
			var jsonResponse = JSON.parse(response);
			
			
			if (typeof jsonResponse[0].NOMBRE !== 'undefined') {
				// está empadronado porque ha devuelto el nombre
				//jQuery(".validacion input").val('500');
				console.log(jsonResponse[0].NOMBRE);				

				jQuery(".validacion input").val('500');
				
				jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/ok_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">Datos válidos.</div><div style="clear: both;"></div>');
				
				jQuery('#mensaje_validacion').show();
				
				lanzar_gfvalidacion(idformulario,validaciones);
				
				//obj_aparece_presupuesto.aparece = 1;
				
			}else{
				jQuery(".validacion input").val('0');
				if (jsonResponse.code == 'no-rows-found') {
					mensaje = 'Fecha de nacimiento y/o ' + jQuery( ".tipo_documento select option:selected" ).val() + ' no encontrados.';
				} else {
					mensaje = 'Ha ocurrido un error al comprobar el número de documento. Por favor contacte con el Ayuntamiento.';
				}
				
				jQuery('#mensaje_validacion').html('<div class="mensaje_error_ico"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" width="40" border="0"></div><div class="mensaje_error_texto">' + mensaje + '</div><div style="clear: both;"></div>');
				
				jQuery('#mensaje_validacion').show();
				
				lanzar_gfvalidacion(idformulario,validaciones);
			}				
		}
	});

	return true;
}


function calcularEdad(fechanac) {

    // Calculamos la edad

        var valoresFecha=fechanac.split("/");
        var dia = valoresFecha[0];
        var mes = valoresFecha[1];
        var ano = valoresFecha[2];

		// cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
		// los meses en JS van del 0 a 11 por lo que sumamos 1
        var ahora_mes = fecha_hoy.getMonth()+1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;

        if ( ahora_mes < mes ) {
            edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
            edad--;
        }

        if (edad > 1900) {
            edad -= 1900;
        }
		
		return edad;
}

function abrir_popup(id_escritora){
	var contenido_html = '';
	switch(id_escritora) {
		case '1':
		
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora1.jpg"></div><div class="ficha__nombre"><p>GLORIA FUERTES</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Poeta española ligada al movimiento literario de la Primera generación de posguerra  y uno de los referentes de la literatura infantil española del siglo XX.</p><p> Escribió para niños y adultos, poesía,  teatro y relato. También fue bibliotecaria y colaboradora de programas de tv infantiles.</p></div><div class="ficha_enlaces"><a href="https://es.wikipedia.org/wiki/Gloria_Fuertes" target="_blank">http://www.biografiasyvidas.com/biografia/f/fuertes.htm</a><br><br><a href="http://www.lecturalia.com/autor/4464/gloria-fuertes" target="_blank">http://www.lecturalia.com/autor/4464/gloria-fuertes</a><br><br><a href="http://escritoras.com/escritoras/Gloria-Fuertes" target="_blank">http://escritoras.com/escritoras/Gloria-Fuertes</a></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '2':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora2.jpg"></div><div class="ficha__nombre"><p>MARÍA MOLINER</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Bibliotecaria comprometida que  colaboró en el impulso  de la lectura  y  organización de las bibliotecas públicas en  España.</p><p> Filóloga y lexicógrafa española,  autora del <em>Diccionario de Uso del Español </em>(1966-1967).</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Mar%C3%ADa_Moliner"  target="_blank">https://es.wikipedia.org/wiki/Mar%C3%ADa_Moliner</a></p><p><a href="http://www.biografiasyvidas.com/biografia/m/moliner.htm"  target="_blank">http://www.biografiasyvidas.com/biografia/m/moliner.htm</a></p><p><a href="http://cvc.cervantes.es/lengua/mmoliner/biografia.htm"  target="_blank">http://cvc.cervantes.es/lengua/mmoliner/biografia.htm</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
			
		case '3':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora3.jpg"></div><div class="ficha__nombre"><p>ANA MARÍA MATUTE</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Novelista y académica de la lengua. Ocupa un lugar preferente en la literatura infantil y juvenil española. Premio de Literatura Miguel de Cervantes 2010.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Ana_Mar%C3%ADa_Matute" target="_blank">https://es.wikipedia.org/wiki/Ana_Mar%C3%ADa_Matute</a></p><p><a href="http://www.cervantes.es/bibliotecas_documentacion_espanol/creadores/matute_ana_maria.htm" target="_blank">http://www.cervantes.es/bibliotecas_documentacion_espanol/creadores/matute_ana_maria.htm</a></p><p><a href="http://www.biografiasyvidas.com/biografia/m/matute.htmhttp://www.biografiasyvidas.com/biografia/m/matute.htm" target="_blank">http://www.biografiasyvidas.com/biografia/m/matute.htm</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '4':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora4.jpg"></div><div class="ficha__nombre"><p>ERNESTINA DE CHAMPOURCÍN</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Poetisa  española de la Generación del 27 y componente del grupo <em>Las Sinsombrero</em>, mujeres que reivindicaron la presencia y  visibilidad de las artistas en el arte y modelo cultural masculinizado del  momento.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Ernestina_de_Champourc%C3%ADn " target="_blank">https://es.wikipedia.org/wiki/Ernestina_de_Champourc%C3%ADn </a></p><p><a href="https://www.escritores.org/biografias/200-ernestina-de-champourcin-moran" target="_blank">https://www.escritores.org/biografias/200-ernestina-de-champourcin-moran</a></p><p><a href="http://leer.es/proyectos/las-sinsombrero/vidayobra/detalle/-/asset_publisher/MBTSgFRnp2nW/content/ernestina-de-champourcin" target="_blank">http://leer.es/proyectos/las-sinsombrero/vidayobra/detalle/-/asset_publisher/MBTSgFRnp2nW/content/ernestina-de-champourcin </a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '5':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora5.jpg"></div><div class="ficha__nombre"><p>MARÍA ZAMBRANO</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Pensadora, filósofa y ensayista española, considerada una de las figuras claves en el desarrollo del  pensamiento contemporáneo español del S.XX.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Mar%C3%ADa_Zambrano" target="_blank">https://es.wikipedia.org/wiki/Mar%C3%ADa_Zambrano </a></p><p><a href="http://www.biografiasyvidas.com/biografia/z/zambrano.htm" target="_blank">http://www.biografiasyvidas.com/biografia/z/zambrano.htm</a></p><p><a href="http://www.lecturalia.com/autor/5419/maria-zambrano" target="_blank">http://www.lecturalia.com/autor/5419/maria-zambrano</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '6':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora6.jpg"></div><div class="ficha__nombre"><p>ÁNGELA GARCÍA RIVES</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Primera bibliotecaria española (1913).</p></div><div class="ficha_enlaces"><p><a href="http://www.bne.es/es/AreaPrensa/noticias2013/0308_PrimeraBibliotecaria.html" target="_blank">http://www.bne.es/es/AreaPrensa/noticias2013/0308_PrimeraBibliotecaria.html</a></p><p><a href="http://blog.bne.es/blog/la-eva-bibliotecaria-en-los-100-anos-del-ingreso-en-el-cuerpo-de-angela-garcia-rives-primera-bibliotecaria-espanola/" target="_blank">https://www.escritores.org/biografias/200-ernestina-de-champourcin-moran</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '7':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora7.jpg"></div><div class="ficha__nombre"><p>MARÍA TERESA LEÓN GOYRI</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Escritora  española integrada en la Generación del 27 y componente del grupo <em>Las Sinsombrero</em>, mujeres que  reivindicaron la presencia y visibilidad de las artistas en el arte y modelo  cultural masculinizado del momento.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/María_Teresa_León" target="_blank">https://es.wikipedia.org/wiki/Mar%C3%ADa_Teresa_Le%C3%B3n</a></p><p><a href="http://leer.es/proyectos/las-sinsombrero/vidayobra/detalle/-/asset_publisher/MBTSgFRnp2nW/content/maria-teresa-leon" target="_blank">http://leer.es/proyectos/las-sinsombrero/vidayobra/detalle/-/asset_publisher/MBTSgFRnp2nW/content/maria-teresa-leon</a></p><p><a href="http://www.lecturalia.com/autor/1994/maria-teresa-leon" target="_blank">http://www.lecturalia.com/autor/1994/maria-teresa-leon</a></p><p><a href="http://escritoras.com/escritoras/Maria-Teresa-Leon" target="_blank">http://escritoras.com/escritoras/Maria-Teresa-Leon</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '8':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora8.jpg"></div><div class="ficha__nombre"><p>ROSA CHACEL</p></div><div class="ficha__descripcion">  <div class="ficha__texto"><p>Escritora  española de la Generación del 27 cuya obra se inscribe dentro de las tendencias  vanguardistas surgidas en la década de los años treinta.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Rosa_Chacel" target="_blank">https://es.wikipedia.org/wiki/Rosa_Chacel</a></p><p><a href="http://www.biografiasyvidas.com/biografia/c/chacel.htm" target="_blank">http://www.biografiasyvidas.com/biografia/c/chacel.htm</a></p><p><a href="http://www.lecturalia.com/autor/3924/rosa-chacel" target="_blank">http://www.lecturalia.com/autor/3924/rosa-chacel</a></p><p><a href="http://escritoras.com/escritoras/Rosa-Chacel" target="_blank">http://escritoras.com/escritoras/Rosa-Chacel</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '9':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora9.jpg"></div><div class="ficha__nombre"><p>EMILIA PARDO BAZÁN</p></div><div class="ficha__descripcion"><div class="ficha__texto"><p>Escritora  y periodista española considerada como una de las novelistas clave en el  realismo y el naturalismo español del siglo XIX y principios del XX.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Emilia_Pardo_Baz%C3%A1n" target="_blank">https://es.wikipedia.org/wiki/Emilia_Pardo_Baz%C3%A1n</a></p><p><a href="http://www.biografiasyvidas.com/biografia/p/pardo_bazan.htm" target="_blank">http://www.biografiasyvidas.com/biografia/p/pardo_bazan.htm</a></p><p><a href="http://www.cervantesvirtual.com/portales/pardo_bazan/" target="_blank">http://www.cervantesvirtual.com/portales/pardo_bazan/</a></p><p><a href="http://www.lecturalia.com/autor/2556/emilia-pardo-bazan" target="_blank">http://www.lecturalia.com/autor/2556/emilia-pardo-bazan</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
		case '10':
			contenido_html = '<div class="ficha"><div class="ficha__imagen"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/05/nombiblioteca_escritora10.jpg"></div><div class="ficha__nombre"><p>CARMEN LAFORET</p></div><div class="ficha__descripcion">    <div class="ficha__texto"><p>Escritora  española  que ganó en 1944 la primera  convocatoria del premio Nadal  con su  novela <em>Nada</em> , obteniendo  gran éxito de crítica y público. En 1957 obtuvo el premio el Nacional de  Literatura en la modalidad de Narrativa.</p></div><div class="ficha_enlaces"><p><a href="https://es.wikipedia.org/wiki/Carmen_Laforet" target="_blank">https://es.wikipedia.org/wiki/Carmen_Laforet</a></p><p><a href="http://www.carmenlaforet.com/biografia/biografia.htm" target="_blank">http://www.carmenlaforet.com/biografia/biografia.htm</a></p><p><a href="http://escritoras.com/escritoras/Carmen-Laforet" target="_blank">http://escritoras.com/escritoras/Carmen-Laforet</a></p><p><a href="http://www.lecturalia.com/autor/1009/carmen-laforet" target="_blank">http://www.lecturalia.com/autor/1009/carmen-laforet</a></p></div></div></div>';
			
			jQuery('.remodal__contenido').html(contenido_html);
			modal_panel.open();
			break;
	} 
}

function abrir_popumensaje(mensaje){
		contenido_html = '<div class="popup_mensaje"><img src="https://encuestasciudadanas.rivasciudad.es/wp-content/uploads/2017/04/error_icon.png" border="0" width="40"><p>' + mensaje + '</p>';
		
		jQuery('.remodal__contenido').html(contenido_html);
		modal_panel.open();
		
	}