var data = {
	'Main Menu': {
		title: 'Main Menu',
		'Return items': {
			title: 'Customer needs to return items',
			info: '',
			'Eligible': {
				title: 'Item(s) to return are eligible',
				info: '',
				'Return not created': {
					title: 'A return has not yet been created',
					info: '',
					'Create return': {
						title: 'Create a return',
						info: 'Create a return'
					}
				},
				'Return created': {
					title: 'A return has already been created',
					info: '',
					'Resend label(s)': {
						title: 'Resend label(s)',
						info: 'The customer needs a copy of the return label(s) resent',
						'Resend labels': {
							title: 'Resend label(s)',
							info: 'Use the “View Return Label” link. Note that the link can be copied and pasted to be opened outside of your remote browser – it does not require you to use the VPN, or to be logged into a specific customer account. Opening it and saving it outside of the remote browser will make the file easier to find. Once you have opened the link, on the label page, press Ctrl + P to open the Print dialog. Choose “Save as PDF”, using the following options: Orientation: Portrait, Zoom: 200%, Margins: none [IMAGES] '
						}
					},
					'Return additional item(s)': {
						title: 'Return additional item(s)',
						info: 'A partial return was created, but the customer needs to also return one or more item that was not included in the original return',
						'Return additional': {
							title: 'Send additional label(s)',
							info: 'Send as many additional labels as needed using the “Generate Return Label [LINK]” link. When you create labels, choose the “Save as PDF” option. Make a [Monday request] to let CRMs know about the additional item(s) being returned, and the additional label(s). Include the tracking numbers for each additional label. '
						}
					},
					'Overshipped': {
						title: 'Overshipped',
						info: 'Customer received a duplicate order/more items than they ordered',
						'Send labels': {
							title: 'Send label(s)',
							info: 'Send as many labels as needed using the “Generate Return Label [LINK]” link. When you create labels, choose the “Save as PDF” option. Make a [Monday request] to let CRMs know about the item(s) being returned, and that no refund is owed. Include the tracking numbers for each additional label.'
						}
					},
					'Create additional label(s)': {
						title: 'Create additional label(s)',
						info: 'A return was created for the correct item(s), but the customer needs additional label(s)',
						'Send more labels': {
							title: 'Send additional label(s)',
							info: 'Send as many additional labels as needed using the “Generate Return Label [LINK]” link. When you create labels, choose the “Save as PDF” option. Make a [Monday request] to let CRMs know about the additional item(s) being returned, and the additional label(s). Include the tracking numbers for each additional label. '
						}
					}
				}
			},
			'Custom': {
				title: 'Custom Air Filters',
				info: '',
				'Custom': {
					title: 'Custom Air Filters',
					info: 'See "Custom Air Filters" section (link to be added later)'
				}
			},
			'Non-returnable': {
				title: 'Other non-returnable items',
				info: '',
				'Refund': {
					title: 'A refund (or partial refund) is appropriate',
					info: '',
					'Refund': {
						title: 'A refund (or partial refund) is appropriate',
						info: 'Submit a Monday request to see whether an exception can be made, do not promise a specific resolution '
					}
				},
				'No refund': {
					title: 'A refund (or partial refund) is not appropriate',
					info: '',
					'No refund': {
						title: 'A refund (or partial refund) is not appropriate',
						info: 'Explain to the customer that we will unfortunately not be able to accept the return, as it is ineligible/outside of the return window'
					}
				}
			},
			'Past return window': {
				title: 'Order was placed more than 365 days ago',
				info: '',
				'Refund': {
					title: 'A refund (or partial refund) is appropriate',
					info: '',
					'Refund': {
						title: 'A refund (or partial refund) is appropriate',
						info: 'Submit a Monday request to see whether an exception can be made, do not promise a specific resolution '
					}
				},
				'No refund': {
					title: 'A refund (or partial refund) is not appropriate',
					info: '',
					'No refund': {
						title: 'A refund (or partial refund) is not appropriate',
						info: 'Explain to the customer that we will unfortunately not be able to accept the return, as it is ineligible/outside of the return window'
					}
				}			
			},
			'Sent in error': {
				title: 'Customer received item(s) in error, and has not placed an order',
				info: '',
				'Send labels': {
					title: 'Send return label(s)',
					info:'Send as many labels as needed using the “Generate Return Label [LINK]” link. When you create labels, choose the “Save as PDF” option. Make a [Monday request] to let CRMs know about the item(s) being returned, and get as much info as possible to help us identify order/customer details.'
				}				
			}
		},
		'Overshipped/short shipped': {
			title: 'Overshipped/short shipped',
			info: '',
			'Overshipped': {
				title: 'Overshipped',
				info: '',
				'Overshipped': {
					title: 'Overshipped',
					info: 'Set up a return, and also, submit a Monday request to let us know a refund is not due'
				}
			},
			'Missing items': {
				title: 'Missing items',
				info: '',
				'Missing items': {
					title: 'Menu in progress',
					info: 'Monday request when needed '
				}
			}
		},
		'Tax exemption': {
			title: 'Tax exemption',
			info: '',
			'Account already exists': {
				title: 'Account already exists',
				info: '',
				'Account already exists': {
					title: 'Account already exists',
					info: `Request tax exempt cert. to support@filtersfast.com 
Advise billing address on account must match form & seller info should be filled in with: 
Filters Fast LLC. 
5905 Stockbridge Dr. 
Monroe. NC 28110 
(Note that if the order is placed before the account is tax exempt, the tax amount paid can be refunded later, also these are done by our accounting and it may be 3-4 business days) `
					},
			},
			'Customer does not yet have an account': {
				title: 'Customer does not yet have an account',
				info: '',
				'Customer does not yet have an account': {
					title: 'Ask the customer to start an order',
					info: 'Ask the customer to start placing their order, up until the point where the order is in a pending status. They can then either email their form and wait until tax exemption has been applied to finish their order, or finish the order immediately, and have the tax amount refunded back to them once the account is tax exempt.'
				}
			}
		},
		'Issues with custom air filters':{
			title: 'Issues with custom air filters',
			info: '',
			'Customer requested cancellation': {
				title: 'Customer requested cancellation',
				info: '',
				'Customer requested cancellation': {
					title: 'Customer requested cancellation',
					info: 'Inform the customer that custom air filters are not eligible for cancellation due to the fact that they are made to order, but we will check whether an exception can be made. Submit a Monday request asking for cancellation.'
				}
			},
			'Customer received wrong size': {
				title: 'Customer received wrong size',
				info: 'Ask whether they measured it with tape measure or held it up to current filter (if they held it up to the current filter, we will need the actual measurements). We need the whole filter, measurement, and need to be able to read the measurement in the photo. Also need photo of shipping label.',
				'Wrong size sent': {
					title: 'Wrong size sent',
					info:'reship correct size, or full refund (customer' + "'" + 's preference) [Monday request]',
					'Wrong size sent': {
						title: 'Wrong size sent',
						info:'reship correct size, or full refund (customer' + "'" + 's preference) [Monday request]',	
					}
				},
				'Customer ordered wrong size': {
					title: 'Customer ordered wrong size',
					info:`Offer to place an order for the correct size, and advise that the original order can then be refunded 
		Make Monday request for the refund, include the new order # 
		If they decline, offer 50% (if escalated, request full refund) [Monday request]`,
					'Customer ordered wrong size': {
						title: 'Customer ordered wrong size',
						info:`Offer to place an order for the correct size, and advise that the original order can then be refunded 
			Make Monday request for the refund, include the new order # 
			If they decline, offer 50% (if escalated, request full refund) [Monday request]`,
					}
				}
			}		
		},
		'Damaged | Defective': {
			title: 'Damaged | Defective',
			info: '',
			'If drop ship/special order, ask for photos of the damaged item, plus the label, and model number if non-disposable items.': {
				title: 'Ask for photos',
				info: `Apologize that it was damaged/defective, locate in CandyPress\.nIf drop ship/special order, ask for photos of the damaged item, plus the label, and model number if non-disposable items.<br>Provide email address or text number support@filtersfast.com 704-228-9166<br>Request refund/reship (customer's preference)<br>Tell customer to hold onto damaged item until refund/reship is done (or until we ask for it back when needed).<br>Confirm who installed (if defective) and gather any other important details.`
			}
		},
		'Order processing issues': {
			title: 'Order processing issues',
			info: '',
			'Content': {
				title: 'Order processing issues',
				info: `Pull up order in CP<br>Verify info<br>Check payment processing panel in CP<br>Pull up Cybersource if more info needed<br>Check order on website to make sure it matches CP and no errors<br>Things to check:<br>No unusual characters in name<br>no letters or unusual characters in phone number or ZIP<br>Cybersource codes when needed<br>Attempt to place order on your end`,
				'Declined': {
					title: 'Declined',
					info: `Try a different card. If no other card can be approved, the order cannot be placed.`
				},
				'Approved': {
					title: 'Approved',
					info: `No further action needed.`
				}
			}
		},
		'Address update needed': {
			title: 'Address update needed',
			info: '',
			'Content': {
				title: 'Address update needed',
				info: `Pull up order in CandyPress`,
				'Order': {
					title: 'Customer wants to change address on order',
					info: `Order details cannot be changed after an order has been placed. Request cancellation when needed, and assist with placing a new order to the correct address. If the address in the account also needs to be updated, offer to help the customer change this from the "Account Details" page.`
				},
				'Account': {
					title: 'Update address on account',
					info: `Change details as needed from the "Account Details" page.`
				},
				'Subscription': {
					title: 'Update address for subscriptions',
					info: `This can be done from the "Subscriptions" page`
				}
			}
		},
		'Webdev': {
			title: 'Webdev',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Product Info': {
			title: 'Product Info',
			info: '',
			'Content': {
				title: 'Content',
				info: ''
			}
		},
		'Order Status': {
			title: 'Order Status',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Cancellations': {
			title: 'Cancellations',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'B2B call': {
			title: 'B2B call',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Account issues | Data removal': {
			title: 'Account issues | Data removal',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Escalation': {
			title: 'Escalation',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Invoice request': {
			title: 'Invoice request',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Inaccurate tracking information': {
			title: 'Inaccurate tracking information',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Incompatible': {
			title: 'Incompatible',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Lost package': {
			title: 'Lost package',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Discount not applied': {
			title: 'Discount not applied',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Check order': {
			title: 'Check order',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		}
		
		
		
		
		
		
		/*,
		'Address update needed': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Webdev': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Product Info': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Order Status': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Cancellations': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'B2B call': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Account issues': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Data removal': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Escalation': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Invoice request': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Inaccurate tracking information': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Incompatible': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Lost package': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Discount not applied': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Check order': {
			title: '',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		}*/
	}
};
