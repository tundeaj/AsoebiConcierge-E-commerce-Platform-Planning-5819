import { supabase } from '../lib/supabase';

export const linkService = {
  // Generate a unique invitation link for an event
  async generateInvitationLink(eventId) {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      // Generate a unique token
      const token = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
      
      // Store the link in the database
      const { data, error } = await supabase
        .from('event_invitations')
        .insert([{
          event_id: eventId,
          created_by: user?.user?.id,
          token,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days expiry
          is_active: true
        }])
        .select();
      
      if (error) throw error;
      
      return { 
        data: {
          token,
          url: `${window.location.origin}/#/guest-rsvp/${eventId}?token=${token}`
        }, 
        error: null 
      };
    } catch (err) {
      console.error('Error generating invitation link:', err);
      return { data: null, error: err };
    }
  },
  
  // Verify an invitation link
  async verifyInvitationLink(token, eventId) {
    try {
      const { data, error } = await supabase
        .from('event_invitations')
        .select('*')
        .eq('token', token)
        .eq('event_id', eventId)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      
      // Check if the link has expired
      const now = new Date();
      const expiresAt = new Date(data.expires_at);
      
      if (now > expiresAt) {
        return { 
          data: null, 
          error: { message: 'Invitation link has expired' } 
        };
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('Error verifying invitation link:', err);
      return { data: null, error: err };
    }
  },
  
  // Deactivate an invitation link
  async deactivateInvitationLink(token) {
    try {
      const { data, error } = await supabase
        .from('event_invitations')
        .update({ is_active: false })
        .eq('token', token)
        .select();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('Error deactivating invitation link:', err);
      return { data: null, error: err };
    }
  },
  
  // Track link usage
  async trackLinkUsage(token, guestId) {
    try {
      const { data, error } = await supabase
        .from('invitation_usages')
        .insert([{
          token,
          guest_id: guestId,
          used_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('Error tracking link usage:', err);
      return { data: null, error: err };
    }
  }
};

export default linkService;