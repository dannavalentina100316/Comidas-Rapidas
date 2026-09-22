<template>
  <q-page class="bg-[#0D0D0D] text-white pb-16">
    <!-- BLOQUE PRINCIPAL "ABOUT US" (Estructura idéntica a la imagen de referencia) -->
    <section class="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <!-- Lado Izquierdo: Imagen del Restaurante con Insignia Naranja Superpuesta -->
        <div class="lg:col-span-6 relative flex justify-center">
          <div class="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Ambiente acogedor de Flavoria Restaurant"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>

            <!-- Insignia Superpuesta "10+ Años de Experiencia" en Caja Naranja (igual a la imagen) -->
            <div class="absolute -bottom-6 left-6 sm:left-8 bg-[#F35D08] text-white p-5 sm:p-6 rounded-2xl shadow-2xl border-2 border-orange-400/40 transform hover:scale-105 transition-transform duration-300">
              <span class="text-3xl sm:text-4xl font-extrabold font-serif-title block leading-none">10+</span>
              <span class="text-xs sm:text-sm font-semibold text-white/95 uppercase tracking-wider block mt-1">
                Años de<br />Experiencia
              </span>
            </div>
          </div>
        </div>

        <!-- Lado Derecho: Concepto, Texto Descriptivo, Botón y Firma -->
        <div class="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
          <div class="space-y-2">
            <span class="text-xs uppercase tracking-[0.3em] text-[#F35D08] font-bold block">
              — ABOUT US —
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-white leading-tight">
              Un Lugar Donde la Buena Comida & los Buenos Momentos se Unen
            </h2>
          </div>

          <p class="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans-body">
            En <strong class="text-white font-semibold">Flavoria</strong>, creemos firmemente que cada bocado debe ser una experiencia para recordar. Nacimos con la visión de dignificar las comidas rápidas, fusionando técnicas de alta cocina con la calidez de recetas elaboradas desde cero con ingredientes puros.
          </p>

          <p class="text-neutral-400 text-sm leading-relaxed font-sans-body">
            Desde el tostado de nuestras masas y panes brioche hasta el ahumado lento de nuestras carnes con madera de manzano, nuestro equipo pone alma en cada detalle. Aquí no solo vienes a comer: vienes a compartir risas, crear anécdotas y sentirte en casa.
          </p>

          <div class="flex flex-wrap items-center gap-6 pt-2">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-7 py-3"
              @click="isReservationOpen = true"
            >
              <span>CONOCER MÁS</span>
              <q-icon name="arrow_forward" size="18px" class="q-ml-sm" />
            </q-btn>

            <!-- Firma Caligráfica Elegante "Flavoria ♡" -->
            <div class="flex items-center text-2xl sm:text-3xl font-script text-[#F35D08]">
              <span>Flavoria</span>
              <span class="ml-1 text-xl">♡</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRANJA DE CARACTERÍSTICAS / GARANTÍAS -->
    <FeaturesStrip />

    <!-- SECCIÓN DEL EQUIPO DE TRABAJO (Mínimo 3 integrantes: Chef Principal, Cajero, Domiciliario) -->
    <section class="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs uppercase tracking-[0.3em] text-[#F35D08] font-bold block mb-2">
          — NUESTRO EQUIPO —
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-white mb-3">
          El Talento Detrás de Flavoria
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="groups" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Personas apasionadas comprometidas con ofrecerte el servicio más veloz y los sabores más inolvidables de la ciudad.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Integrante 1: Chef Principal -->
        <div class="flavoria-card overflow-hidden text-center group">
          <div class="relative h-80 overflow-hidden bg-neutral-950">
            <img
              src="https://i.pinimg.com/736x/0a/8f/50/0a8f50b7b2075aca251cd70c3b72db0a.jpg"
              alt="Chef Mateo Arango"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
            <div class="absolute top-4 right-4 bg-[#F35D08] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Líder Culinario
            </div>
          </div>
          <div class="p-6 bg-[#1A1A1A]">
            <h3 class="text-xl font-bold font-serif-title text-white mb-1">
              Chef Mateo Arango
            </h3>
            <span class="text-xs text-[#F35D08] uppercase tracking-wider font-extrabold block mb-3">
              Chef Ejecutivo & Maestro Parrillero
            </span>
            <p class="text-xs text-neutral-400 leading-relaxed m-0">
              Formado en escuelas gastronómicas de Argentina y España, Mateo diseña cada receta del menú con obsesión por la textura y el equilibrio ahumado perfecto.
            </p>
            <div class="flex justify-center space-x-3 mt-4 text-neutral-400">
              <span class="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:text-white hover:bg-orange-600 transition-colors">
                <i class="fa-brands fa-instagram text-xs"></i>
              </span>
              <span class="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:text-white hover:bg-orange-600 transition-colors">
                <i class="fa-brands fa-linkedin text-xs"></i>
              </span>
            </div>
          </div>
        </div>

        <!-- Integrante 2: Cajero y Atención al Cliente -->
        <div class="flavoria-card overflow-hidden text-center group">
          <div class="relative h-80 overflow-hidden bg-neutral-950">
            <img
              src="https://i.pinimg.com/1200x/29/36/a5/2936a5f248ca331e261f8ad8215ad723.jpg"
              alt="Camila Restrepo"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
            <div class="absolute top-4 right-4 bg-neutral-900/90 border border-neutral-700 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Atención
            </div>
          </div>
          <div class="p-6 bg-[#1A1A1A]">
            <h3 class="text-xl font-bold font-serif-title text-white mb-1">
              Camila Restrepo
            </h3>
            <span class="text-xs text-[#F35D08] uppercase tracking-wider font-extrabold block mb-3">
              Cajera Líder & Hostess Principal
            </span>
            <p class="text-xs text-neutral-400 leading-relaxed m-0">
              La primera sonrisa que te recibe en Flavoria. Camila gestiona los pedidos con agilidad impecable, garantizando que tu experiencia sea acogedora y sin demoras.
            </p>
            <div class="flex justify-center space-x-3 mt-4 text-neutral-400">
              <span class="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:text-white hover:bg-orange-600 transition-colors">
                <i class="fa-brands fa-instagram text-xs"></i>
              </span>
              <span class="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:text-white hover:bg-orange-600 transition-colors">
                <i class="fa-brands fa-facebook text-xs"></i>
              </span>
            </div>
          </div>
        </div>

        <!-- Integrante 3: Domiciliario Express -->
        <div class="flavoria-card overflow-hidden text-center group">
          <div class="relative h-80 overflow-hidden bg-neutral-950">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Andrés Morales"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
            <div class="absolute top-4 right-4 bg-[#F35D08] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Logística Flash
            </div>
          </div>
          <div class="p-6 bg-[#1A1A1A]">
            <h3 class="text-xl font-bold font-serif-title text-white mb-1">
              Andrés Morales
            </h3>
            <span class="text-xs text-[#F35D08] uppercase tracking-wider font-extrabold block mb-3">
              Capitán de Domicilios Express
            </span>
            <p class="text-xs text-neutral-400 leading-relaxed m-0">
              Conoce cada atajo de la ciudad para que tus hamburguesas y pizzas lleguen crocantes, humeantes y en el tiempo prometido a la puerta de tu hogar.
            </p>
            <div class="flex justify-center space-x-3 mt-4 text-neutral-400">
              <span class="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:text-white hover:bg-orange-600 transition-colors">
                <i class="fa-brands fa-whatsapp text-xs"></i>
              </span>
              <span class="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:text-white hover:bg-orange-600 transition-colors">
                <i class="fa-brands fa-strava text-xs"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FILOSOFÍA Y METAS FLAVORIA -->
    <section class="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div class="rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-14 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#F35D08]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div class="space-y-2">
            <h4 class="text-4xl font-serif-title font-bold text-[#F35D08]">+85.000</h4>
            <h5 class="text-base font-bold text-white uppercase tracking-wider">Platos Servidos</h5>
            <p class="text-xs text-neutral-400">Sonrisas y estómagos felices respaldan cada año nuestra cocina artesanal.</p>
          </div>
          <div class="space-y-2 border-y md:border-y-0 md:border-x border-neutral-800 py-6 md:py-0 md:px-8">
            <h4 class="text-4xl font-serif-title font-bold text-[#F35D08]">4.9 / 5</h4>
            <h5 class="text-base font-bold text-white uppercase tracking-wider">Calificación Promedio</h5>
            <p class="text-xs text-neutral-400">Más de 2.500 reseñas verificadas elogian la consistencia y sabor de nuestros platos.</p>
          </div>
          <div class="space-y-2 md:pl-8">
            <h4 class="text-4xl font-serif-title font-bold text-[#F35D08]">30 Min</h4>
            <h5 class="text-base font-bold text-white uppercase tracking-wider">Tiempo Promedio Entrega</h5>
            <p class="text-xs text-neutral-400">Compromiso real de frescura térmica desde que sale de la plancha hasta tu mesa.</p>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import FeaturesStrip from '../components/FeaturesStrip.vue';
import { useCart } from '../composables/useCart.js';

const { isReservationOpen } = useCart();
</script>
