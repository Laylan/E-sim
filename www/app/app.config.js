(function () {
  'use strict';

  angular
    .module('esim-app')
    .config(configure);

  configure.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

  function configure($httpProvider, $stateProvider, $urlRouterProvider) {

    configureHttp();
    configureState();
    configureRouter();

    function configureHttp() {
      $httpProvider.interceptors.push('TokenHeader');
      $httpProvider.interceptors.push('ErrorHandler');
    }

    function configureState() {
      $stateProvider
        .state('main', {
          abstract: true,
          url: '/main',
          templateUrl: 'app/layout/main.tpl.html',
          controller: 'AppController as main',
          resolve: {
            militaryRanks: 'MilitaryRanks'
          }
        })
        .state('main.about', {
          url: '/about',
          templateUrl: 'app/about/index.tpl.html',
          controller: 'AboutController as about',
        })
        .state('main.achievements', {
          url: '/achievements/{userId:[0-9]+}',
          templateUrl: 'app/achievements/achievements.tpl.html',
          controller: 'AchievementsController as achievements',
          resolve: {
            achieved: function achieveResolver(AchievementsData, $stateParams) {
              return AchievementsData.fetchAchievements($stateParams.userId);
            },
            types: function typesResolver(AchievementsData) {
              return AchievementsData.fetchAchievementsTypes();
            },
          }
        })
        .state('main.equipment', {
          url: '/equipment',
          templateUrl: 'app/equipment/equipment.tpl.html',
          controller: 'EquipmentController as equipment',
          resolve: {
            equipped: function equipmentResolver(EquipmentData) {
              return EquipmentData.fetchEquipmentOn();
            },
            equipmentList: function equipmentListResolver(EquipmentData) {
              return EquipmentData.fetchEquipmentOff();
            },
            battleStats: function battleStatsResolver(EquipmentData) {
              return EquipmentData.fetchStats();
            },
          }
        })
        .state('main.fight', {
          url: '/fight/{fightId:[0-9]+}',
          templateUrl: 'app/fight/fight.tpl.html',
          controller: 'FightController as fight',
          resolve: {
            fight: function FightsResolver(FightData, $stateParams) {
              return FightData.fetchFight($stateParams.fightId);
            },
            storage: function storage(ResourcesData) {
              return ResourcesData.fetchAllResources();
            },
            limits: function limits(FightData) {
              return FightData.limits();
            }
          }
        })
        .state('main.friends', {
          url: '/friends/{friendId:[0-9]+}?{page}',
          templateUrl: 'app/friends/friends.tpl.html',
          controller: 'FriendsController as friends',
          resolve: {
            friendsList: function FriendsResolver(FriendsData, $stateParams) {
              return FriendsData.fetchFriends($stateParams.friendId, $stateParams.page);
            },
          }
        })
        .state('main.fightList', {
          url: '/fightList',
          templateUrl: 'app/fightList/fight-list.tpl.html',
          controller: 'FightListController as fightList',
          resolve: {
            fights: function FightsResolver(FightListData) {
              return FightListData.fetchLocalFights();
            }
          }
        })
        .state('main.inbox', {
          abstract: true,
          url: '/inbox',
          templateUrl: 'app/inbox/inbox.tpl.html',
          controller: 'InboxController'
        })
        .state('main.inbox.messages', {
          url: '/messages',
          templateUrl: 'app/inbox/messages/messages.tpl.html',
          controller: 'MessagesController as messages',
          resolve: {
            baseMessages: function MessagesResolver(MessagesData) {
              return MessagesData.fetchMessages(1);
            },
            baseMessageCount: function MessageCountResolver(MessagesData) {
              return MessagesData.fetchMessageCount();
            }
          }
        })
        .state('main.sentMessages', {
          url: '/sentMessages',
          templateUrl: 'app/inbox/messages/sentMessages/sent-messages.tpl.html',
          controller: 'SentMessagesController as sentMessages',
          resolve: {
            sent: function sentResolver(SentMessagesData) {
              return SentMessagesData.fetchSentMessages(1);
            },
          }
        })
        .state('main.writeMessage', {
          url: '/writeMessage/{receiver:[0-9a-zA-Z_\\s]+}?{title}?{receiverId:[0-9]+}',
          templateUrl: 'app/inbox/messages/writeMessage/write-message.tpl.html',
          controller: 'WriteMessageController as writeMessage',
        })
        .state('main.inbox.notifications', {
          url: '/notifications',
          templateUrl: 'app/inbox/notifications/notifications.tpl.html',
          controller: 'NotificationsController as notifications',
          resolve: {
            baseNotifications: function NotificationsResolver(NotificationsData) {
              return NotificationsData.fetchNotifications(1);
            },
            baseNotificationCount: function NotificationCountResolver(NotificationsData) {
              return NotificationsData.fetchNotificationCount();
            },
            notificationTypes: "NotificationTypes"
          }
        })
        .state('main.inbox.subs', {
          url: '/subs',
          templateUrl: 'app/inbox/subs/subs.tpl.html',
          controller: 'SubsController as subs',
          resolve: {
            baseSubs: function SubsResolver(SubsData) {
              return SubsData.fetchSubs(1);
            },
            baseSubsCount: function SubsCountResolver(SubsData) {
              return SubsData.fetchSubsCount();
            }
          }
        })
        .state('main.inventory', {
          url: '/inventory',
          templateUrl: 'app/inventory/inventory.tpl.html',
          controller: 'InventoryController as stash',
          resolve: {
            storage: function storage(ResourcesData) {
              return ResourcesData.fetchAllResources();
            },
            money: function money(InventoryData) {
              return InventoryData.fetchMoney();
            },
          }
        })
        .state('main.specialItem', {
          url: '/specialItem',
          templateUrl: 'app/specialItem/specialItem.tpl.html',
          controller: 'SpecialItemController as specialItems',
          resolve: {
            specialItem: function specialItemResolver(SpecialItemData) {
              return SpecialItemData.fetchSpecialItems();
            }
          }
        })
        .state('main.localShouts', {
          url: '/shouts',
          templateUrl: 'app/localShouts/local-shouts.tpl.html',
          controller: 'LocalShoutsController as localShouts',
          resolve: {
            shouts: function ShoutsResolver(LocalShoutsData) {
              return LocalShoutsData.fetchLocalShouts(0);
            }
          }
        })
        .state('main.localShoutsList', {
          url: '/shoutsList/{shoutId:[0-9]+}',
          templateUrl: 'app/localShouts/localShoutsList/local-shouts-list.tpl.html',
          controller: 'LocalShoutsListController as localShoutsList',
          resolve: {
            shout: function ShoutResolver(LocalShoutsListData, $stateParams) {
              return LocalShoutsListData.fetchShout($stateParams.shoutId);
            },
            comments: function CommentListResolver(LocalShoutsListData, $stateParams) {
              return LocalShoutsListData.fetchComments($stateParams.shoutId, 1);
            }
          }
        })
        .state('main.profileByLogin', {
         url: '/profileByLogin/{citizenLogin:[0-9a-zA-Z_\\s]+}',
         templateUrl: 'app/profile/user/user.tpl.html',
         controller: 'UserController as profile',
         resolve: {
           profileData: function ProfileResolver(UserData, $stateParams) {
             return UserData.fetchCitizenByLogin($stateParams.citizenLogin);
           },
         }
       })
        .state('login', {
          url: '^/login',
          templateUrl: 'app/login/login.tpl.html',
          controller: 'LoginController as main',
          resolve: {
            // servers: function ServersResolver(Login){
            //   return Login.getServerList();
            // }
          }
        })
        .state('main.main', {
          url: '/main',
          templateUrl: 'app/main/main.tpl.html',
          controller: 'MainController as main',
          resolve: {
            militaryRanks: 'MilitaryRanks'
          }
        })
        .state('main.markets', {
          abstract: true,
          url: '/markets',
          templateUrl: 'app/markets/markets.tpl.html',
          controller: 'MarketsController'
        })
        .state('main.markets.auctions', {
          url: '/auctions',
          templateUrl: 'app/markets/auctions/auctions.tpl.html',
          controller: 'AuctionsController as auctions',
          resolve: {
            auctions: function auctions(AuctionsData) {
              return AuctionsData.fetchAuctions(1, 'IN_PROGRESS', 'TIME', '');
            },
            money: function money(CountryData) {
              return CountryData.fetchMoney();
            }
          }
        })
        .state('main.auctionsOffers', {
          url: '/auctionsOffers',
          templateUrl: 'app/markets/auctions/auctionsOffers/auctions-offers.tpl.html',
          controller: 'AuctionsOffersController as auctionsOffers',
          resolve: {
            myAuctionsOffers: function auctionsOffersResolver(AuctionsOffersData) {
              return AuctionsOffersData.fetchMyAuctions(1, 'IN_PROGRESS');
            }
          }
        })
        .state('main.markets.jobMarket', {
          url: '/jobMarket',
          templateUrl: 'app/markets/jobMarket/job-market.tpl.html',
          controller: 'JobMarketController as jobMarket',
          resolve: {
            baseJobOffers: function (JobMarketData, $rootScope) {
              return JobMarketData.fetchJobOffers(1, $rootScope.loggedPlayer.citizenshipId, 0);
            },
            baseJobOfferCount: function (JobMarketData, $rootScope) {
              return JobMarketData.fetchJobOfferCount($rootScope.loggedPlayer.citizenshipId, 0);
            },
            countries: function countryList(CountryData) {
              return CountryData.countryList();
            },
            workData: function WorkDataResolver(WorkData) {
              return WorkData.fetchWorkData();
            }
          }
        })
        .state('main.markets.monetaryMarket', {
          url: '/monetaryMarket',
          templateUrl: 'app/markets/monetaryMarket/monetary-market.tpl.html',
          controller: 'MonetaryMarketController as monetaryMarket',
          resolve: {
            offers: function MonetaryMarketResolver(MonetaryMarketData, $rootScope) {
              return MonetaryMarketData.fetchOffers(0, 0, $rootScope.loggedPlayer.citizenshipId); //page, buyerid, sellerid
            },
            currienciesList: function currienciesList(CountryData) {
              return CountryData.currienciesList();
            },
            money: function money(CountryData) {
              return CountryData.fetchMoney();
            },
          }
        })
        .state('main.monetaryOffers', {
          url: '/monetaryOffers',
          templateUrl: 'app/markets/monetaryMarket/monetaryOffers/monetary-offers.tpl.html',
          controller: 'MonetaryOffersController as monetaryOffers',
          resolve: {
            myOffers: function MonetaryOffersResolver(MonetaryOffersData) {
              return MonetaryOffersData.fetchMyOffers(1); //page, buyerid, sellerid
            },
            currienciesList: function currienciesList(CountryData) {
              return CountryData.currienciesList();
            },
            money: function money(CountryData) {
              return CountryData.fetchMoney();
            },
          }
        })
        .state('main.markets.productMarket', {
          url: '/productMarket',
          templateUrl: 'app/markets/productMarket/product-market.tpl.html',
          controller: 'ProductMarketController as products',
          resolve: {
            products: function ProductMarketResolver(ProductMarketData, $rootScope) {
              return ProductMarketData.fetchProducts(1, $rootScope.loggedPlayer.citizenshipId, 0, '');
            },
            current: function currentPosition(TravelListData) {
              return TravelListData.currentPosition();
            },
            countryList: function countryList(CountryData) {
              return CountryData.countryList();
            },
            money: function money(CountryData) {
              return CountryData.fetchMoney();
            }
          }
        })
        .state('main.productOffers', {
          url: '/productOffers',
          templateUrl: 'app/markets/productMarket/productOffers/product-offers.tpl.html',
          controller: 'ProductOffersController as productOffers',
          resolve: {
            myProductOffers: function ProductOffersResolver(ProductOffersData) {
              return ProductOffersData.fetchMyProductOffers(1);
            },
            current: function currentPosition(TravelListData) {
              return TravelListData.currentPosition();
            },
            countryList: function countryList(CountryData) {
              return CountryData.countryList();
            },
            currienciesList: function currienciesList(CountryData) {
              return CountryData.currienciesList();
            },
          }
        })
        .state('main.profileMu', {
          url: '/militaryUnit/{militaryUnitId:[0-9]+}',
          templateUrl: 'app/profile/militaryUnit/military-unit.tpl.html',
          controller: 'MilitaryUnitController as militaryUnit',
          resolve: {
            militaryUnitData: function militaryUnitResolver(MilitaryUnitData, $stateParams) {
              return MilitaryUnitData.fetchMilitaryUnit($stateParams.militaryUnitId);
            },
          }
        })
        .state('main.profileParty', {
          url: '/party/{partyId:[0-9]+}',
          templateUrl: 'app/profile/party/party.tpl.html',
          controller: 'PartyController as party',
          resolve: {
            partyData: function partyResolver(PartyData, $stateParams) {
              return PartyData.fetchParty($stateParams.partyId);
            },
          }
        })

      .state('main.profileSc', {
          url: '/stockCompany/{companyId:[0-9]+}',
          templateUrl: 'app/profile/stockCompany/stock-company.tpl.html',
          controller: 'StockCompanyController as stockCompany',
          resolve: {
            stockCompanyData: function stockCompanyResolver(StockCompanyData, $stateParams) {
              return StockCompanyData.fetchCompany($stateParams.companyId);
            },
          }
        })
        .state('main.profile', {
          url: 'app/profile/{profileId:[0-9]+}',
          templateUrl: 'app/profile/user/user.tpl.html',
          controller: 'UserController as profile',
          resolve: {
            profileData: function ProfileResolver(UserData, $stateParams) {
              return UserData.fetchProfile($stateParams.profileId);
            },
          }
        })

      .state('main.train', {
          url: '/train',
          templateUrl: function ($stateParams) {
            //  console.log($stateParams);
            return 'app/train/train.tpl.html';
          },
          //templateUrl: 'app/train/train.tpl.html',
          controller: 'TrainController as train',
          resolve: {
            trainData: function TrainDataResolver(TrainData) {
              return TrainData.fetchTrainData();
            },
            militaryRanks: 'MilitaryRanks'
          }
        })
        .state('main.travel', {
          url: '/travel/{countryId:[0-9]+}',
          templateUrl: 'app/travel/travel.tpl.html',
          controller: 'TravelController as travel',
          resolve: {
            regions: function TravelResolver(TravelData, $stateParams) {
              return TravelData.getRegions($stateParams.countryId);
            },
            storage: function storage(ResourcesData) {
              return ResourcesData.fetchAllResources();
            }
          }
        })
        .state('main.travelList', {
          url: '/travelList',
          templateUrl: 'app/travelList/travel-list.tpl.html',
          controller: 'TravelListController as travel',
          resolve: {
            current: function CurrentPoition(TravelListData) {
              return TravelListData.currentPosition();
            },
            countryList: function countryList(TravelListData) {
              return TravelListData.countryList();
            }
          }
        })
        .state('main.work', {
          url: '/work',
          templateUrl: 'app/work/work.tpl.html',
          controller: 'WorkController as work',
          resolve: {
            workData: function WorkDataResolver(WorkData) {
              return WorkData.fetchWorkData();
            }
          }
        })
        .state('main.articles', {
            url: '/articles',
            templateUrl: 'app/articles/articles.tpl.html',
            controller: 'ArticlesController as articles',
            resolve: {
              articlesList: function ArticlesDataResolver(ArticlesData, $rootScope) {
                return ArticlesData.fetchArticles(1, $rootScope.loggedPlayer.citizenshipId);
              }
            }
        })
        .state('main.openArticle', {
                url: '/openArticle/{articleId:[0-9]+}',
                templateUrl: 'app/articles/openArticle/open-article.tpl.html',
                controller: 'OpenArticleController as openArticle',
                resolve: {
                  articleData: function OpenArticleDataResolver(OpenArticleData, $stateParams) {
                    return OpenArticleData.fetchArticle($stateParams.articleId);
                  },
                  articleCommentsData: function OpenArticleDataResolver(OpenArticleData, $stateParams) {
                    return OpenArticleData.fetchComments(1, $stateParams.articleId);
                  }
                }
        });
    }

    function configureRouter() {
      $urlRouterProvider.otherwise('/login');
    }
  }

})();
