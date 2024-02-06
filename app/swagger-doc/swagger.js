const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API pour la liste des travaux possibles",
      version: "1.0.0",
      description: "API permettant de récupérer la liste des travaux possibles depuis l'API ADEME."
    },
    paths: {
      "/works-list": {
        get: {
          summary: "Obtenez la liste des travaux possibles",
          description: "Récupère la liste des travaux possibles depuis l'API ADEME.",
          responses: {
            200: {
              description: "Liste des travaux récupérée avec succès",
              content: {
                "application/json": {
                  example: ["Audit énergétique", "Bardage ventilé", "Brasseur d'air", "..."]
                }
              }
            },
            500: {
              description: "Intern server error",
              content: {
                "application/json": {
                  example: {
                    message: "An unknown error occurred to get works list."
                  }
                }
              }
            }
          }
        }
      },
      "/collectivities-list": {
        get: {
          summary: "Obtenir les informations sur la collectivité en fonction du code postal",
          description: "Récupère les informations sur la collectivité en fonction du code postal en utilisant l'API Gouv.",
          parameters: [
            {
              in: "query",
              name: "zipCode",
              description: "Code postal de la collectivité",
              required: true,
              example: "75000",
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            200: {
              description: "Informations sur la collectivité récupérées avec succès",
              content: {
                "application/json": {
                  example: {
                    nom:"Anglefort",
                    code:"01010",
                    codeDepartement:"01",
                    siren:"210100103",
                    codeEpci:"200070852",
                    codeRegion:"84",
                    codesPostaux:["01350"],
                    population:1101
                  }
                }
              }
            },
            404: {
              description: "Collectivity not found",
              content: {
                "application/json": {
                  example: { message: "Collectivity not found" }
                }
              }
            },
            500: {
              description: "Intern server error",
              content: {
                "application/json": {
                  example: { message: "An unknown error occurred to get informations about collectivity." }
                }
              }
            }
          }
        }
      },
      "/eligible-systems": {
        get: {
          summary: "Obtenir la liste des dispositifs éligibles pour des travaux spécifiques",
          description: "Récupère la liste des dispositifs éligibles pour des travaux spécifiques en fonction de différents critères. Exemple de requête : `https://api.evalie.fr/eligible-systems?codeCollectivity=28085&codeCollectivityDepartment=28&codeCollectivityRegion=24&selectedItem=Audit+%C3%A9nerg%C3%A9tique&typeHouseLowerCase=maison`",
          parameters: [
            {
              in: "query",
              name: "codeCollectivity",
              description: "Code de la collectivité",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "query",
              name: "codeCollectivityDepartment",
              description: "Code du département de la collectivité",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "query",
              name: "codeCollectivityRegion",
              description: "Code de la région de la collectivité",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "query",
              name: "selectedItem",
              description: "Nom des travaux sélectionné",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "query",
              name: "typeHouseLowerCase",
              description: "Type de logement (en minuscules, 'appartement' ou 'maison')",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            200: {
              description: "Dispositifs d'aide financière récupérés avec succès",
              content: {
                "application/json": {
                  example: [
                    {
                      fin_validite: "2023-12-31",
                      code_type_dispositif: "CEE",
                      financeur: "Aides des entreprises privées",
                      id: 1452,
                      intitule: "Certificats d’Economie d’Energie (CEE)",
                      descriptif: "<p>Cette aide / prime peut être attribuée par des fournisseurs d'énergie ou de carburant.</p><p>Les matériaux et les équipements achetés doivent être fournis par l'entreprise qui effectue leur installation.\r\nIls doivent répondre à des exigences techniques précises.\r\nPour bénéficier de ce dispositif, l'entreprise qui met en œuvre les travaux doit être titulaire de la mention RGE.</p><p><span style=\"color: rgb(255, 0, 0); background-color: yellow;\">Attention:</span> Il est impératif de contractualiser votre démarche avec le fournisseur d’énergie avant l’engagement de l’opération qui correspond à la date d’acceptation du devis. Il est donc conseillé de comparer les offres des différents opérateurs : vous n’êtes pas obligé de choisir votre fournisseur d’énergie.</p><div>Pour obtenir plus d'informations sur le Dispositif des Certificats d’économies d’énergie:</div><div>&nbsp;<a href=\"https://www.ecologie.gouv.fr/dispositif-des-certificats-deconomies-denergie\" target=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"NotApplicable\" data-linkindex=\"0\" style=\"background-color: rgb(255, 255, 255); text-decoration-line: underline; outline: 0px; margin: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 14.6667px; line-height: inherit; font-family: Calibri, sans-serif; vertical-align: baseline;\">https://www.ecologie.gouv.fr/dispositif-des-certificats-deconomies-denergie</a></div>",
                      debut_validite: "2016-12-15",
                    }
                  ]
                }
              }
            },
            404: {
              description: "No matching",
              content: {
                "application/json": {
                  example: {
                    message: "No matching"
                  }
                }
              }
            },
            500: {
              description: "Intern server error",
              content: {
                "application/json": {
                  example: {
                    message: "An unknown error occurred to get eligible help systems."
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routers/*.js'],
};

export default swaggerOptions;
