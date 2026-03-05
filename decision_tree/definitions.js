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
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Damaged | Defective': {
			title: 'Damaged | Defective',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Order processing issues': {
			title: 'Order processing issues',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
			}
		},
		'Address update needed': {
			title: 'Address update needed',
			info: '',
			'Content': {
				title: 'Menu in progress',
				info: ''
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
