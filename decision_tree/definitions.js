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
					info: ``,
					'Declined': {
						title: 'Declined',
						info: `Try a different card. If no other card can be approved, the order cannot be placed.`
					},
				},
				'Approved': {
					title: 'Approved',
					info: ``,
					'Approved': {
						title: 'Approved',
						info: `No further action needed.`
					}
				}
			}
		},
		'Address update needed': {
			title: 'Address update needed',
			info: '',
			'Address update needed': {
			title: 'Address update needed',
			info: 'Pull up order in Candypress',
				'Order': {
					title: 'Customer wants to change address on order',
					info: ``,
					'Order': {
						title: 'Customer wants to change address on order',
						info: `Order details cannot be changed after an order has been placed. Request cancellation when needed, and assist with placing a new order to the correct address. If the address in the account also needs to be updated, offer to help the customer change this from the "Account Details" page.`
					},
				},
				'Account': {
					title: 'Update address on account',
					info: ``,
					'Account': {
						title: 'Update address on account',
						info: `Change details as needed from the "Account Details" page.`
					}
				},
				'Subscription': {
					title: 'Update address for subscriptions',
					info: ``,
					'Subscription': {
						title: 'Update address for subscriptions',
						info: `This can be done from the "Subscriptions" page`
					}
				}
			}
		},
		'Webdev': {
			title: 'Webdev',
			info: '',
			'Webdev': {
				title: 'WebDev issue',
				info: 'Put in a CE website issues ticket, include screenshots when possible, include ALL details that could be helpful to webdev'
			}
		},
		'Product Info': {
			title: 'Product Info',
			info: '',
			'Product Info': {
				title: 'Product Info',
				info: `Get model # if possible<br>Check repair clinic, also other third party websites - make sure the customer understands the info is from a third party and we can't guarantee its reliability<br>- Pool filters: get measurements, check Spa Daddy<br>- Microwave filters: get measurements & check spreadsheet repairclinic.com can be helpful with a model number<br>Monday request for more info if necessary`
			}
		},
		'Order Status': {
			title: 'Order Status',
			info: '',
			'Order Status': {
				title: 'Order Status',
				info: 'Pull up order in CP, make sure order is in PAID status, check for tracking. To know whether an item is stock, drop ship, or special order, go to the page for the item on filtersfast.com, and check the lead time. Stock items will say "In stock" (unless they are currently out of stock). If an item shows a lead time, it is either drop ship, or special order. Special order will say "Spcial order" in front of the lead time. If you see a lead time, but do not see "Special order", this is a drop ship item.',
				'Stock': {
					title: 'ERD is needed for stock items',
					info: '',
					'Stock': {
						title: 'ERD is needed for stock items',
						info: 'Call the CRM queue for an ERD',
					},
				},
				'Drop ship/Special order': {
					title: 'Check ERD board',
					info: '',
					'Drop ship/Special order': {
						title: 'Check ERD board',
						info: 'Check for the item on the ERD board. This data comes directly from NAV, so if the order/item you are looking for is not listed, or if it shows a date that has already passed, we will need to contact the vendor for an update, so a Monday reqeust will be needed.'
					}
				}
			}
		},
		'Cancellations': {
			title: 'Cancellations',
			info: '',
			'Cancellations': {
				title: 'Cancellations',
				info: '',
				'Everything shipped': {
					title: 'Everything shipped',
					info: '',
					'Everything shipped': {
						title: 'Everything shipped',
						info: 'If you can confirm all items on the order have shipped (which can be done by verifying that the number of items on the order matches the number of tracking links), the order cannot be cancelled. Set up a return when possible/needed.'
					},
				},
				'Paritally shipped': {
					title: 'Paritally shipped',
					info: ``,
					'Paritally shipped': {
						title: 'Paritally shipped',
						info: `If the order shows a shipped status, but there are more items on the order than there are tracking numbers, it may be possible to cancel part of the order. Call the CRM queue to see if the part of the order needing to be cancelled has already shipped. If not, submit a Monday request for cancellation of the items in question. Do not promise cancellation, as orders/items cannot always be cancelled. A return can be set up (for eligible items) if cancellation is not possible.`
					},
				},
				'Nothing shipped': {
					title: 'Nothing shipped',
					info: ``,
					'Nothing shipped': {
						title: 'Nothing shipped',
						info: `Submit a Monday request for cancellation. If the customer is only requesting partial cancellation, specify the item(s) that should be ccancelled. Do not promise cancellation, as orders/items cannot always be cancelled. A return can be set up (for eligible items) if cancellation is not possible.`
					}
				}
			}
		},
		'B2B call': {
			title: 'B2B call',
			info: ``,
			'B2B call': {
				title: 'B2B call',
				info: `Search Missive contacts for the name of the company. (You don't need to put the whole name, as you type into the search box, it will show all partial matches)`,
				'Customer not found in Missive contacts': {
					title: 'Customer not found in Missive contacts',
					info: ``,
					'Customer not found in Missive contacts': {
						title: 'B2B call',
						info: `This is not a B2B call. Advise customer they can place orders with you or through our website.`
					},
				},
				'Customer found, but without [B2B] prefix': {
					title: 'Customer found, but without [B2B] prefix',
					info: ``,
					'Customer found, but without [B2B] prefix': {
						title: 'Customer found, but without [B2B] prefix',
						info: `Search Missive contacts for the name of the company. (You don't need to put the whole name, as you type into the search box, it will show all partial matches)`
					},
				},
				'Customer found, and contact name begins with [B2B]': {
					title: 'Customer found, and contact name begins with [B2B]',
					info: ``,
					'Customer found, and contact name begins with [B2B]': {
						title: 'Customer found, and contact name begins with [B2B]',
						info: `Search Missive contacts for the name of the company. (You don't need to put the whole name, as you type into the search box, it will show all partial matches)`
					},
				},
			}
		},
		'Account issues | Data removal': {
			title: 'Account issues | Data removal',
			info: '',
			'Change email': {
				title: 'Change of email address',
				info: '',
				'Change of email address': {
					title: 'Change of email addresss',
					info: 'Email address can be changed from "Privacy and Security" page'
				}
			},
			'Unable to login': {
				title: 'Unable to login',
				info: '',
				'Unable to login': {
					title: 'Reset password',
					info: 'Password reset email can be sent from the CandyPress customer maintanence page, or can be manually set from the "Privacy and Security" page'
				}
			},
			'Subscriptions': {
				title: 'Help with subscriptions',
				info: '',
				'Help with subscriptions': {
					title: 'Help with subscriptions',
					info: 'Subscriptions can be managed from the "Subscriptions" page'
				}
			},
			'Reminders': {
				title: 'Reminders',
				info: '',
				'Reminders': {
					title: 'Reminders',
					info: 'Reminders can be managed from the "Product Reminders" page'
				}
			},
			'Merging': {
				title: 'Merging',
				info: '',
				'Merging': {
					title: 'Identify all customer IDs',
					info: `Identify all customer IDs. (If none under orders, this may be because there are no orders on the account - search under "Customer Management" - either "Customers" or "Customers Legacy")<br>Turn off all reminders and cancel all subscriptions for any account(s) that will be made inactive as a result of merging<br>Note: under any of the following conditions, it will take longer, because we will need to wait until they are resolved to merge:<br>- Outstanding order (not shipped)<br>- Return awaiting refund`
				}
			},
			'Data removal': {
				title: 'Data removal',
				info: '',
				'Clarify what is needed': {
					title: 'Clarify what is needed',
					info: '',
					'Unsubscribe from marketing': {
						title: 'Unsubscribe from marketing',
						info: '',
						'Unsubscribe from marketing': {
							title: 'Unsubscribe from marketing',
							info: 'Submit an unsubscribe request'
						}
					}
				},
				'Cancel subscriptions/reminders': {
					title: 'Cancel subscriptions/reminders',
					info: '',
					'Cancel subscriptions/reminders': {
						title: 'Cancel subscriptions/reminders',
						info: 'Cancel from the "Subscriptions" page'
					},
				},
				'Make account inactive': {
					title: 'Clarify what is needed',
					info: '',
					'Make account inactive': {
						title: 'Clarify what is needed',
						info: 'Submit a Monday request'
					}
				},
				'Full data removal': {
					title: 'Clarify what is needed',
					info: '',
					'Full data removal': {
						title: 'Clarify what is needed',
						info: 'Submit a Monday request'
					}
				}
			}
		},
		'Escalation': {
			title: 'Escalation',
			info: '',
			'Escalation': {
				title: 'Escalation',
				info: `Locate the order in CP, identify issue, apologize<br>Try to de-escalate the best you can, make Urgent/Sup Monday request for any action`
			}
		},
		'Invoice request': {
			title: 'Invoice request',
			info: '',
			'Invoice request': {
				title: 'Invoice request',
				info: `Locate order in CP, determine if they prefer order confirmation or invoice<br>If invoice is needed, make a Monday request (do not send the CandyPress invoice)<br>Advise customer invoice cannot be sent until order has completely shipped<br>if absolutely necessary, we can 🐌 mail an invoice`
			}
		},
		'Inaccurate tracking information': {
			title: 'Inaccurate tracking information',
			info: '',
			'Inaccurate tracking information': {
				title: 'Inaccurate tracking information',
				info: 'Monday request<br>If return is needed (or status needs to be changed right away for any other reason), consult w/ CRM'
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
			'Lost package': {
				title: 'Lost package',
				info: '-Locate order in CandyPress and view tracking<br>Locate order in CandyPress and view tracking<br>-Confirm shipping address is correct',
				'Returned to sender': {
					title: 'Returned to sender',
					info: ``,
					'Returned to sender': {
						title: 'Returned to sender',
						info: `If tracking confirms we have received it:<br>-Check Cybersource for refund (CRM can check PayPal)<br>-If no refund, request one, advise if the order is still needed, a new one needs to be placed<br>-Can request reship if preferred by customer, depending on reason for it being returned to sender (check tracking details)`
					}
				},
				'Says delivered but not received': {
					title: 'Says delivered but not received',
					info: '',
					'Says delivered but not received': {
						title: 'Says delivered but not received',
						info: 'Confirm the shipping address. If it is correct, ask the customer whether they want a reship or refund. If incorrect, it can only be refunded, and a new order will need to be placed if needed. In either case, submit a Monday request.'
					}
				},
				'Still in transit': {
					title: 'Still in transit',
					info: '',
					'Tracking has been updated in last 7 days': {
						title: 'Tracking has been updated in last 7 days',
						info: '',
						'Tracking has been updated in last 7 days': {
							title: 'Tracking has been updated in last 7 days',
							info: 'Use judgement (for example, if it shows 4+ days no update and an error status). If a refund/reship is not yet appropriate, advise that it is only considered lost after 7 days with no updates. Though if it is taking longer than expected and the customer is escalated, offer a refund of the shipping cost. (First, check to make sure there was a shipping cost, and that it has not already been refunded.) If the shipping needs to be refunded, submit a Monday request.'
						}
					},
					'No tracking update in last 7 days': {
						title: 'No tracking update in last 7 days',
						info: '',
						'No tracking update in last 7 days': {
							title: 'Address is correct',
							info: '',
							'Address is correct': {
								title: 'Address is correct',
								info: ''
							}
						},
						'Address is wrong ': {
							title: 'Address is wrong ',
							info: '',
							'Address is wrong ': {
								title: 'No tracking update in last 7 days',
								info: 'Must refund, customer can place a new order. Cannot reship to different address '
							}
						}
					}
				}	
			}
		},
		'Discount not applied': {
			title: 'Discount not applied',
			info: '',
			'Discount not applied': {
				title: 'Discount not applied',
				info: ``,
				'Order in progress':{
					title: 'Order in progress',
					info: ``,
					'Order in progress':{
						title: 'Order in progress',
						info: `Call CRM to adjust`
					},
				},
				'Order has already been placed':{
					title: 'Order has already been placed',
					info: ``,
					'Order is eligible':{
						title: 'Order is eligible',
						info: ``,
						'Order is eligible':{
							title: 'Order is eligible',
							info: `Make request, let them know we will refund (3-7 days)<br>Order was not eligible/courtesy`
						}
					},
					'Order is not eligible':{
						title: 'Order is not eligible',
						info: ``,
						'Order is not eligible':{
							title: 'Order is not eligible',
							info: `Make a request for the discount but do not guarantee`
						}
					}
				}
			}
		},
		'Check order': {
			title: 'Check order',
			info: '',
			'Check order': {
				title: 'Check Order',
				info: `Prepare order in CP<br>Create Monday request with order info<br>Cancel pending order<br>Provide customer with all needed info:<br>Cost<br>Order number on memo,<br>Address: PO Box 49387 Charlotte, NC 28277<br>Inform customer:<br>they will receive a cancellation email, but their order is not cancelled<br>it may take 2 weeks to receive the check`
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
