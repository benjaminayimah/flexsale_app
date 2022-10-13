<template>
    <div id="mob_nav" v-if="getMobile">
        <div class="mob-nav-content" :class="{ 'mb-16' : getPhone}">
            <li>
            <router-link :to="{ name: 'Dashboard'}">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g fill="none">
                            <path class="fill-primary icon" d="M17.333,24a4,4,0,0,1-4-4V16a4,4,0,0,1,4-4H20a4,4,0,0,1,4,4v4a4,4,0,0,1-4,4ZM4,24a4,4,0,0,1-4-4V18.667a4,4,0,0,1,4-4H6.667a4,4,0,0,1,4,4V20a4,4,0,0,1-4,4ZM4,12A4,4,0,0,1,0,8V4A4,4,0,0,1,4,0H6.667a4,4,0,0,1,4,4V8a4,4,0,0,1-4,4ZM17.333,9.334a4,4,0,0,1-4-4V4a4,4,0,0,1,4-4H20a4,4,0,0,1,4,4V5.333a4,4,0,0,1-4,4Z" stroke="none"/>
                            <path class="fill-primary icon" d="M 20.00040054321289 22 C 21.10297966003418 22 22 21.10297966003418 22 20.00040054321289 L 22 15.99973964691162 C 22 14.89715003967285 21.10297966003418 14.00012969970703 20.00040054321289 14.00012969970703 L 17.33279991149902 14.00012969970703 C 16.23022079467773 14.00012969970703 15.33320045471191 14.89715003967285 15.33320045471191 15.99973964691162 L 15.33320045471191 20.00040054321289 C 15.33320045471191 21.10297966003418 16.23022079467773 22 17.33279991149902 22 L 20.00040054321289 22 M 6.667200088500977 22 C 7.769780158996582 22 8.666799545288086 21.10297966003418 8.666799545288086 20.00040054321289 L 8.666799545288086 18.66720008850098 C 8.666799545288086 17.5639591217041 7.769780158996582 16.66640090942383 6.667200088500977 16.66640090942383 L 3.999599933624268 16.66640090942383 C 2.897020101547241 16.66640090942383 2 17.5639591217041 2 18.66720008850098 L 2 20.00040054321289 C 2 21.10297966003418 2.897020101547241 22 3.999599933624268 22 L 6.667200088500977 22 M 6.667200088500977 9.999870300292969 C 7.769780158996582 9.999870300292969 8.666799545288086 9.102849960327148 8.666799545288086 8.000269889831543 L 8.666799545288086 3.999599933624268 C 8.666799545288086 2.897020101547241 7.769780158996582 2 6.667200088500977 2 L 3.999599933624268 2 C 2.897020101547241 2 2 2.897020101547241 2 3.999599933624268 L 2 8.000269889831543 C 2 9.102849960327148 2.897020101547241 9.999870300292969 3.999599933624268 9.999870300292969 L 6.667200088500977 9.999870300292969 M 20.00040054321289 7.333600044250488 C 21.10297966003418 7.333600044250488 22 6.436039924621582 22 5.332799911499023 L 22 3.999599933624268 C 22 2.897020101547241 21.10297966003418 2 20.00040054321289 2 L 17.33279991149902 2 C 16.23022079467773 2 15.33320045471191 2.897020101547241 15.33320045471191 3.999599933624268 L 15.33320045471191 5.332799911499023 C 15.33320045471191 6.436039924621582 16.23022079467773 7.333600044250488 17.33279991149902 7.333600044250488 L 20.00040054321289 7.333600044250488 M 20.00040054321289 24 L 17.33279991149902 24 C 15.12360000610352 24 13.33320045471191 22.2096004486084 13.33320045471191 20.00040054321289 L 13.33320045471191 15.99973964691162 C 13.33320045471191 13.79053974151611 15.12360000610352 12.00012969970703 17.33279991149902 12.00012969970703 L 20.00040054321289 12.00012969970703 C 22.2096004486084 12.00012969970703 24 13.79053974151611 24 15.99973964691162 L 24 20.00040054321289 C 24 22.2096004486084 22.2096004486084 24 20.00040054321289 24 Z M 6.667200088500977 24 L 3.999599933624268 24 C 1.79040002822876 24 -1.77635683940025e-15 22.2096004486084 -1.77635683940025e-15 20.00040054321289 L -1.77635683940025e-15 18.66720008850098 C -1.77635683940025e-15 16.45800018310547 1.79040002822876 14.66639995574951 3.999599933624268 14.66639995574951 L 6.667200088500977 14.66639995574951 C 8.876399993896484 14.66639995574951 10.66679954528809 16.45800018310547 10.66679954528809 18.66720008850098 L 10.66679954528809 20.00040054321289 C 10.66679954528809 22.2096004486084 8.876399993896484 24 6.667200088500977 24 Z M 6.667200088500977 11.99987030029297 L 3.999599933624268 11.99987030029297 C 1.79040002822876 11.99987030029297 -1.77635683940025e-15 10.20946979522705 -1.77635683940025e-15 8.000269889831543 L -1.77635683940025e-15 3.999599933624268 C -1.77635683940025e-15 1.79040002822876 1.79040002822876 -1.77635683940025e-15 3.999599933624268 -1.77635683940025e-15 L 6.667200088500977 -1.77635683940025e-15 C 8.876399993896484 -1.77635683940025e-15 10.66679954528809 1.79040002822876 10.66679954528809 3.999599933624268 L 10.66679954528809 8.000269889831543 C 10.66679954528809 10.20946979522705 8.876399993896484 11.99987030029297 6.667200088500977 11.99987030029297 Z M 20.00040054321289 9.333600044250488 L 17.33279991149902 9.333600044250488 C 15.12360000610352 9.333600044250488 13.33320045471191 7.541999816894531 13.33320045471191 5.332799911499023 L 13.33320045471191 3.999599933624268 C 13.33320045471191 1.79040002822876 15.12360000610352 -1.77635683940025e-15 17.33279991149902 -1.77635683940025e-15 L 20.00040054321289 -1.77635683940025e-15 C 22.2096004486084 -1.77635683940025e-15 24 1.79040002822876 24 3.999599933624268 L 24 5.332799911499023 C 24 7.541999816894531 22.2096004486084 9.333600044250488 20.00040054321289 9.333600044250488 Z" stroke="none" fill="#000"/>
                        </g>
                    </svg>
                </i>
                <span>Home</span>
            </router-link>
            </li>
            <li>
            <router-link :to="{ name: 'Products', params: { id: 'all' , name: 'products'} }">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23.756 23.851">
                    <g id="tag" transform="translate(-1.808 -2.045)">
                        <path  class="fill-primary stroke-primary icon" d="M17.887,24l6.1-6.133a2.738,2.738,0,0,0,0-3.763L13.516,3.622a2.769,2.769,0,0,0-.66-.484A1.861,1.861,0,0,0,12.106,3H5.35a2.716,2.716,0,0,0-1.77.762A2.716,2.716,0,0,0,3,5.667v6.146a2.608,2.608,0,0,0,.183,1.056,2.984,2.984,0,0,0,.678.888l10.024,9.988A2.714,2.714,0,0,0,17.887,24Z" transform="translate(-0.176 0.047)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                        <circle class="stroke-secondary fill-secondary icon" cx="2" cy="2" r="2" transform="translate(6.709 6.91)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                    </g>
                </svg>

                </i>
                <span>Products</span>
            </router-link>
            </li>
            <li>
            <a id="add_button" href="javascript: void">
                <mob-add-dialog />
            </a>
            </li>
            <li>
            <router-link :to="'/sales-record/filter/todays-sales'">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22.919 24.013">
                    <g id="news" transform="translate(0 1)">
                        <path class="stroke-primary icon" d="M5.1,35.482a2.1,2.1,0,0,1-2.1-2.1v-6.5a2.214,2.214,0,0,1,.543-1.315A3.061,3.061,0,0,1,5.1,25" transform="translate(-2 -13.47)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                        <path class="fill-primary stroke-primary icon" d="M9.785,3.883a3.137,3.137,0,0,0-.8,1.77V22.916c0,1.158.139,2.1-1.018,2.1H24.338a2.939,2.939,0,0,0,2.489-2.842L26.8,5.653a2.66,2.66,0,0,0-.722-1.77A2.575,2.575,0,0,0,24.338,3H11.691A3.029,3.029,0,0,0,9.785,3.883Z" transform="translate(-4.908 -3)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                        <path class="fill-secondary icon" d="M9.372,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H9.372a1,1,0,0,1,1,1A1,1,0,0,1,9.372,1Z" transform="translate(8.214 12.64)"/>
                        <path class="fill-secondary icon" d="M9.372,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H9.372a1,1,0,0,1,1,1A1,1,0,0,1,9.372,1Z" transform="translate(8.214 16.806)"/>
                        <rect class="stroke-secondary icon" width="9.372" height="4.165" rx="1" transform="translate(8.214 4.31)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                    </g>
                </svg>

                </i>
                <span>Records</span>
            </router-link>
            </li>
            <li>
            <a href="#" id="more_mob" @click.prevent="showthisMenu('more_mob')">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                    <g id="Group_4489" data-name="Group 4489" transform="translate(0 0)">
                        <g id="Ellipse_9" data-name="Ellipse 9" transform="translate(0 0)" fill="none" stroke="#000" stroke-width="2">
                        <circle cx="12" cy="12" r="12" stroke="none"/>
                        <circle cx="12" cy="12" r="11" fill="none"/>
                        </g>
                        <g id="Icon_ionic-ios-more" data-name="Icon ionic-ios-more" transform="translate(4.268 10)">
                        <path id="Path_8" data-name="Path 8" d="M17.314,15.328a2,2,0,1,0,2,2,2,2,0,0,0-2-2Z" transform="translate(-9.589 -15.328)"/>
                        <path id="Path_9" data-name="Path 9" d="M6.5,15.328a2,2,0,1,0,2,2,2,2,0,0,0-2-2Z" transform="translate(-4.5 -15.328)"/>
                        <path id="Path_10" data-name="Path 10" d="M28.156,15.328a2,2,0,1,0,2,2,2,2,0,0,0-2-2Z" transform="translate(-14.69 -15.328)"/>
                        </g>
                    </g>
                </svg>

                </i>
                <span>More</span>
            </a>
            </li>
        </div>
    </div>
    <teleport to="body">
      <transition name="fade">
        <backdrop v-if="showMenu" @click.prevent="showthisMenu('more_mob')" />
      </transition>
      <transition name="slide">
        <div class="dialog" v-if="showMenu" :class="{ 'menu-card-mob': getMobile}" :style="{ left: getFloatingDiv.left+'px', bottom: getFloatingDiv.bottom + 'px' }">
          <div class="title" v-show="getMobile">
            <div>More menus</div>
            <button @click.prevent="showthisMenu('more_mob')">
              <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#7e8596"/>
              </svg>
          </button>
          </div>
            <ul id="more_menu_mob">
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'ProfileStoreDetails', params: { name: getUser.name }}">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 19.597 22.966">
                                <path d="M-155.951-501.122A24.73,24.73,0,0,1-165.3-502.7l-.445-.2v-.487a7.545,7.545,0,0,1,7.536-7.537h4.524a7.545,7.545,0,0,1,7.537,7.537v.487l-.445.2A24.73,24.73,0,0,1-155.951-501.122Zm-8.278-2.765a25.4,25.4,0,0,0,8.278,1.265,25.269,25.269,0,0,0,8.278-1.264,6.045,6.045,0,0,0-6.016-5.531h-4.524A6.044,6.044,0,0,0-164.229-503.888Zm8.278-8.169a5.28,5.28,0,0,1-4.043-2.066,6.889,6.889,0,0,1-1.609-4.315,5.658,5.658,0,0,1,5.651-5.651,5.658,5.658,0,0,1,5.651,5.651C-150.3-515.425-152.717-512.057-155.951-512.057Zm0-10.532a4.156,4.156,0,0,0-4.151,4.151,5.442,5.442,0,0,0,1.262,3.356,3.814,3.814,0,0,0,2.889,1.524,3.814,3.814,0,0,0,2.889-1.524,5.442,5.442,0,0,0,1.262-3.356A4.156,4.156,0,0,0-155.951-522.588Z" transform="translate(165.75 524.088)"/>
                            </svg>
                        </div>
                        <span>Profile</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{name: 'Tags'}">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 12.468 8.124">
                                <path d="M-1997.337-3040.028h-5.532a2.5,2.5,0,0,1-1.412-.4,1.748,1.748,0,0,1-.587-1.487v-4.467a1.981,1.981,0,0,1,.55-1.286,2.435,2.435,0,0,1,1.361-.48h5.549a3.961,3.961,0,0,1,1.148.176,2.666,2.666,0,0,1,.919.564l2.57,2.571a1.316,1.316,0,0,1,.366.786.975.975,0,0,1-.395.744l-2.416,2.416a2.592,2.592,0,0,1-.963.684A3.443,3.443,0,0,1-1997.337-3040.028Zm-5.481-1h5.481a2.552,2.552,0,0,0,.8-.118,1.619,1.619,0,0,0,.568-.408l.032-.035,2.493-2.493a.786.786,0,0,0-.057-.075l-2.542-2.542a1.7,1.7,0,0,0-.546-.333,3,3,0,0,0-.82-.121h-5.514a1.445,1.445,0,0,0-.728.224,1,1,0,0,0-.219.578l0,4.5a.808.808,0,0,0,.184.615,1.531,1.531,0,0,0,.818.206h.051Z" transform="translate(2004.873 3048.152)"/>
                            </svg>
                        </div>
                        <span>Tags</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'Suppliers' }">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16.144 19.065">
                                <path d="M-4144.75-98.349v-.666a8.081,8.081,0,0,1,8.072-8.071,8.08,8.08,0,0,1,8.072,8.071v.666Zm1.363-1.33h13.418a6.751,6.751,0,0,0-6.709-6.077A6.751,6.751,0,0,0-4143.387-99.68Zm2.787-13.523a4.217,4.217,0,0,1,4.211-4.212,4.217,4.217,0,0,1,4.212,4.212,4.217,4.217,0,0,1-4.212,4.213A4.218,4.218,0,0,1-4140.6-113.2Zm1.33,0a2.885,2.885,0,0,0,2.881,2.882,2.886,2.886,0,0,0,2.883-2.882,2.885,2.885,0,0,0-2.883-2.881A2.885,2.885,0,0,0-4139.271-113.2Z" transform="translate(4144.75 117.414)"/>
                            </svg>
                        </div>
                        <span>My Suppliers</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link to="/discounts">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22.5 22.5">
                                <path d="M-4152.781-279.75a4.036,4.036,0,0,1-4.031-4.031,4.036,4.036,0,0,1,4.031-4.031,4.036,4.036,0,0,1,4.031,4.031A4.036,4.036,0,0,1-4152.781-279.75Zm0-6.563a2.534,2.534,0,0,0-2.531,2.531,2.534,2.534,0,0,0,2.531,2.531,2.534,2.534,0,0,0,2.531-2.531A2.534,2.534,0,0,0-4152.781-286.313Zm-16.407,5.25a.748.748,0,0,1-.53-.22.747.747,0,0,1-.22-.53.748.748,0,0,1,.22-.53l18.375-18.375a.75.75,0,0,1,1.061,0,.747.747,0,0,1,.22.53.748.748,0,0,1-.22.53l-18.375,18.375A.748.748,0,0,1-4169.188-281.063Zm1.969-13.125a4.036,4.036,0,0,1-4.031-4.031,4.036,4.036,0,0,1,4.031-4.031,4.036,4.036,0,0,1,4.031,4.031A4.036,4.036,0,0,1-4167.219-294.188Zm0-6.563a2.534,2.534,0,0,0-2.531,2.531,2.534,2.534,0,0,0,2.531,2.531,2.534,2.534,0,0,0,2.531-2.531A2.534,2.534,0,0,0-4167.219-300.75Z" transform="translate(4171.25 302.25)"/>
                            </svg>
                        </div>
                        <span>Discounts</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="'/sales-record/filter/todays-sales'">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22.638 22.638">
                                <path d="M-4170.306-473.723h0a2.767,2.767,0,0,1-2.763-2.764v-8.8h3.01v1.5h-1.51v7.3a1.266,1.266,0,0,0,1.264,1.264,1.265,1.265,0,0,0,1.262-1.264v-19.875h18.612v19.875a2.766,2.766,0,0,1-2.763,2.764Zm2.764-2.764a2.746,2.746,0,0,1-.307,1.264h14.655a1.265,1.265,0,0,0,1.263-1.264v-18.375h-15.611Zm2.474-2.236v-1.5h10.5v1.5Zm0-4v-1.5h10.5v1.5Zm0-4v-5.5h10.5v5.5Zm1.5-1.5h7.5v-2.5h-7.5Z" transform="translate(4173.069 496.362)"/>
                            </svg>
                        </div>
                        <span>Records</span>
                    </router-link>
                </li>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'Trash'}">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21.5 23.166">
                                <path d="M-162.427-433a2.727,2.727,0,0,1-2.714-2.539l-.912-13.682,1.5-.1.912,13.683a1.222,1.222,0,0,0,1.217,1.138h9.118a1.222,1.222,0,0,0,1.217-1.139l.912-13.682,1.5.1-.912,13.682A2.727,2.727,0,0,1-153.309-433Zm-6.039-18v-1.5h6.4v-3.666h8.394v3.666h6.705v1.5Zm13.295-1.5v-2.165h-5.394v2.165Z" transform="translate(168.466 456.167)"/>
                            </svg>
                        </div>
                        <span>Trash</span>
                    </router-link>
                </li>
                 <hr>
                <li @click="showthisMenu('more_mob')">
                    <router-link :to="{ name: 'Settings'}">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23.5 23.5">
                                <path d="M-159.906-585.5l-.281-3.358a8.646,8.646,0,0,1-1.716-.714l-2.576,2.179-3.1-3.1,2.179-2.576a8.67,8.67,0,0,1-.711-1.714l-3.358-.281v-4.379l3.358-.281a8.71,8.71,0,0,1,.714-1.715l-2.179-2.575,3.1-3.1,2.576,2.18a8.675,8.675,0,0,1,1.714-.711l.281-3.359h4.379l.281,3.359a8.656,8.656,0,0,1,1.714.714l2.575-2.179,3.1,3.1-2.18,2.576a8.67,8.67,0,0,1,.711,1.714l3.359.281v4.379l-3.359.281a8.708,8.708,0,0,1-.714,1.714l2.18,2.575-3.1,3.1-2.576-2.179a8.668,8.668,0,0,1-1.714.711l-.281,3.361Zm-1.673-5.621a7.166,7.166,0,0,0,2.262.94l.536.122.256,3.06h1.62l.256-3.063.536-.122a7.18,7.18,0,0,0,2.26-.938l.465-.3,2.349,1.988,1.146-1.146-1.988-2.349.3-.465a7.174,7.174,0,0,0,.941-2.26l.121-.536,3.06-.256v-1.62l-3.06-.256-.121-.536a7.18,7.18,0,0,0-.938-2.26l-.3-.465,1.987-2.349-1.148-1.146-2.349,1.988-.465-.3a7.166,7.166,0,0,0-2.26-.941l-.536-.121-.256-3.06h-1.62l-.256,3.06-.536.121a7.182,7.182,0,0,0-2.26.938l-.465.3-2.348-1.987-1.147,1.147,1.988,2.349-.3.465a7.165,7.165,0,0,0-.941,2.26l-.121.536-3.06.256v1.62l3.06.256.121.536a7.161,7.161,0,0,0,.939,2.26l.294.465-1.987,2.349,1.145,1.146,2.349-1.988Zm.112-6.128a3.755,3.755,0,0,1,3.75-3.75,3.754,3.754,0,0,1,3.75,3.75,3.755,3.755,0,0,1-3.75,3.75A3.755,3.755,0,0,1-161.466-597.25Zm1.5,0a2.253,2.253,0,0,0,2.25,2.25,2.253,2.253,0,0,0,2.25-2.25,2.252,2.252,0,0,0-2.25-2.25A2.253,2.253,0,0,0-159.966-597.25Z" transform="translate(169.465 609)"/>
                            </svg>
                        </div>
                        <span>Settings</span>
                    </router-link>
                </li>
            </ul>
        </div>
      </transition>
    </teleport>
</template>
<script>
import { mapGetters } from 'vuex'
import Backdrop from './Backdrop.vue'
import MobAddDialog from './MobAddDialog.vue'
export default {
    name: 'MobileNavigation',
    components: { Backdrop, MobAddDialog },
    computed: mapGetters(['getMobile', 'getFloatingDiv', 'getUser', 'getPhone']),
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        showthisMenu(id) {
            let elem = document.getElementById(id)
            if(this.showMenu == false) {
                this.showMenu = true
                this.$store.commit('setDynamicFloatingDiv', elem)
            }else{
                this.showMenu = false
                this.$store.commit('reSetDynamicFloatingDiv', elem)
            }
        }
    }
}
</script>
<style scoped lang="scss">
#mob_nav{
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
//   border-top-left-radius: 8px;
//   border-top-right-radius: 8px;
//   box-shadow: rgb(86 111 244 / 33%) 0 5px 12px 0;
  background-color: $white-color;
  border-top: 1px solid #e9ebf0;
  .router-link-exact-active{
  & span{
      color: $primary-color;
      font-weight: 600;
  }
  & svg {
        .icon{
            transition: 0.5s all;
        }
        .fill-primary{
            fill: $primary-color;
        }
        .fill-secondary{
            fill: $white-color;
        }
        .stroke-primary{
            stroke: $primary-color;
        }
        .stroke-secondary{
            stroke: $white-color;
        }
    }
}
}
.mob-nav-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
  height: 54px;
  padding: 0 15px;
  li{
    list-style-type: none;
    display: flex;
    justify-content: center;
    width: 20%;
    position: relative;
    a{
      display: flex;
      flex-direction: column;
      text-decoration: none;
      justify-content: center;
      font-size: 0.75rem;
      width: 100%;
      gap: 5px;
    //   justify-content: space-between;
      i{
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 20px;
      }
      span{
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-weight: 600;
        color: $dark;
        
      }
    }
    &:nth-child(3) {
        width: 15%;
    }
  }
  #add_button{
    position: absolute;
    align-items: center;
    top: -10px;
  }
}

.dialog{
    position: fixed;
    background-color: $white-color;
    z-index: 101;
    box-shadow: 0 1px 6px 0 rgb(14 20 44 / 18%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 0; 
  }
  
  .menu-card-mob{
    width: 100%;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
#more_menu_mob {
    li svg path {
        fill: $dark;
    }
    li label{
        font-size: 0.8rem;
        text-align: center;
        display: none;
   }
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(615px);
  
}
</style>