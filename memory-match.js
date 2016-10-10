/**
 * Created by Katsurio on 10/8/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches= 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function display_stats() {
    accuracy = (matches / attempts) * 100;
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy.toFixed()); // cut (+ '%') for looks
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
}

function reset_cards() {
    $('.victory-h1').remove();
    $(first_card_clicked).removeClass('clicked');
    $(second_card_clicked).removeClass('clicked');
    first_card_clicked = null;
    second_card_clicked = null;
    $('.card').removeClass('clicked').click(card_clicked);
}
function card_clicked() {
    if($(this).hasClass('clicked')) {
        return;
    }
    $(this).find(".back").hide();
    if (first_card_clicked === null) {
        console.log("1st card = null");
        first_card_clicked = $(this).addClass('clicked');
        console.log(first_card_clicked);
    } else {
        console.log("else/1st card != null");
        second_card_clicked = $(this).addClass('clicked');
        console.log(second_card_clicked);
        if($(first_card_clicked).find('.front img').attr('src') == $(second_card_clicked).find('.front img').attr('src')) {
            console.log("we have a match");
            ++match_counter;
            ++matches;
            ++attempts;
            console.log('attempts/match: ', attempts);
            first_card_clicked = null;
            second_card_clicked = null;
            display_stats();
            if(match_counter === total_possible_matches) {
                $('.main-content').append($('<h1>').addClass('victory-h1').text("Victory!"));
            }
            return false;
        } else {
            $('.card').off();
            ++attempts;
            console.log('attempts/not a match', attempts);
            function two_cards_mismatch_timeout() {
                $(first_card_clicked).removeClass('clicked').find(".back").show();
                $(second_card_clicked).removeClass('clicked').find(".back").show();
                first_card_clicked = null;
                second_card_clicked = null;
                $('.card').click(card_clicked);
            }
            setTimeout(two_cards_mismatch_timeout, 2000);
            display_stats();
        }
    }
    display_stats();
}

function apply_click_handlers(){
    display_stats();
    $('.card').click(card_clicked);
    $('.reset').click(function() {
        games_played++;
        reset_stats();
        display_stats();
        reset_cards();
        $('.card').find('.back').show();
    })
}
$(document).ready(apply_click_handlers);