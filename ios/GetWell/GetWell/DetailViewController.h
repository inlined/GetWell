//
//  DetailViewController.h
//  GetWell
//
//  Created by Thomas Bouldin on 9/14/12.
//  Copyright (c) 2012 HackForGood. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController

@property (strong, nonatomic) id detailItem;

@property (weak, nonatomic) IBOutlet UILabel *detailDescriptionLabel;
@end
